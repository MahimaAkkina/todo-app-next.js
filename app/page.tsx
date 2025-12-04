"use client";
import "./globals.css";
import {useState} from "react";
export default function TodoPage(){
  const [inputTask,setInputTask]=useState("");
  const [tasks,setTasks]=useState<string[]>([]);
  const addTask=()=>{
    if(inputTask.trim()===""){
      return;
    }
    setTasks([...tasks,inputTask]); //creating new array by adding new task ast end
    setInputTask(""); //clears the input box

  };
  // const completeTask=(idToComp:number)=>{
  //   setTasks(task)
  // }
  const delTask=(idToDel:number)=>{
    setTasks(tasks.filter((_,index)=>index!==idToDel));

  };
  return(
    <div className="p-4 main text-white rounded-3 text-center">
      <h2 className="py-2 mb-4 rounded-5">TO DO LIST OF TASKS</h2>
      <div className="d-flex justify-content-center">
        <input type="text" className="py-2 form-control w-25" 
        placeholder="Enter your task.." value={inputTask}
        onChange={(event)=>setInputTask(event.target.value)}/>
        <button className="btn btn-success mx-5" onClick={addTask}>Add Task</button>
      </div>
      <ul className="list-group mt-4">
        {tasks.map((task,index)=>(
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{task}
        <button className="btn btn-success btn-sm" onClick={()=>completeTask(index)}>Complete</button>
        <button className="btn btn-danger btn-sm" onClick={()=>delTask(index)}>Delete</button>
        </li>
        ))}
        {/* <li className="list-group-item d-flex justify-content-between align-items-center">Sample Task
          <button className="btn btn-danger btn-sm">Delete</button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">Sample </li> */}

      </ul>
    </div>
)
}