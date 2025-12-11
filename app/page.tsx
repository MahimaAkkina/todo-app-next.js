"use client";

import {useEffect,useState} from "react";
import "./globals.css";
type TaskItem={
  _id:string;
  text:string;
  isCompleted:boolean;
}
export default function TodoPage(){
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");


  const [inputTask,setInputTask]=useState("");
  const [taskList,setTasks]=useState<TaskItem[]>([]);

  //To load tasks from MongoDB
  useEffect(()=>{
    fetch("/api/todos")
    .then(response=>response.json())
    .then(data=>setTasks(data))
  },[]);

  //Add Task
  const addTask=async()=>{
    if(inputTask.trim()===""){
      return;
    }
    const response=await fetch("/api/todos",{
      method:"POST",
      headers:{"Content-type":'application/json'},
      body:JSON.stringify({
        text:inputTask,
        isCompleted:false,
      }),
    });

    //duplicates check
    if(!response.ok) {
    const data=await response.json();
    alert(data.error); //Shows "This task already exists"
    return;
  }

    // setTasks([...tasks,inputTask]); //creating new array by adding new task ast end
    const newTask=await response.json(); //Converting data(string) from server to JS object
    setTasks([...taskList,newTask]); //Adding item to old array
    setInputTask(""); //clears the input box

  };

  //Complete Task function
  const completeTask=async(idToComp:string, completed:boolean)=>{
    await fetch("/api/todos", {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({idToComp}), 
    });

    setTasks(
      taskList.map((taskItem)=> //it iterates through each element
        taskItem._id===idToComp ? {...taskItem, isCompleted:!taskItem.isCompleted } : taskItem //...spread operator: it copies all properties of taskItem
    ));
  };

  //Delete Task
  const delTask=async(idToDel:string)=>{
    await fetch("/api/todos", {
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({idToDel}),
    });

    setTasks(taskList.filter(taskItem=>taskItem._id!=idToDel));
  };
  return(
    <div className="p-4 main text-white rounded-3 text-center">
      <h2 className="py-2 mb-4 rounded-5">TO DO LIST OF TASKS</h2>
        
      <div className="d-flex justify-content-center">
        <input type="text" className="py-2 form-control w-25" 
        placeholder="Enter your task.." value={inputTask}
        onChange={(event)=>setInputTask(event.target.value)}
        />
        <button className="btn btn-success mx-5" onClick={addTask}>Add Task</button>
      </div>
        
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("all")}>All</button>

        <button className={`btn btn-sm ${filter === "active" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setFilter("active")}>Active</button>

        <button className={`btn btn-sm ${filter === "completed" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul className="list-group mt-4">
        {taskList
          .filter(taskItem=>{
            if(filter==="active"){
              return !taskItem.isCompleted;
            }
            if(filter==="completed"){
              return taskItem.isCompleted;
            }
            return true; //to display all tasks
          })
        
        .map((taskItem)=>(
          <li key={taskItem._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={taskItem.isCompleted ? "text-decoration-line-through" : ""}>{taskItem.text} </span>

            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={()=>completeTask(taskItem._id,taskItem.isCompleted)}>Complete</button>
              <button className="btn btn-danger btn-sm" onClick={()=>delTask(taskItem._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
