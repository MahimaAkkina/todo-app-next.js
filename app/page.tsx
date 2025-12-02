import "./globals.css";
export default function TodoPage(){
  return(
    <div className="m-5 p-4 main text-white rounded-5 text-center">
      <h2 className="py-2 mb-4 rounded-5">TO DO LIST OF TASKS</h2>
      <div className="d-flex justify-content-center">
        <input type="text" className="py-2 form-control w-25" placeholder="Enter your task.." />
        <button className="btn btn-success mx-5">Add Task</button>
      </div>
    </div>
)
}