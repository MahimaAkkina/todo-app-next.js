import {connectdb} from "@/lib/mongodb"
import Todo from "@/models/todo";
import {NextResponse} from "next/server";

//Fetching all tasks
export async function GET(){ // TO READ ALL TASKS FROM MONGODB
    await connectdb(); //MongoDB must be connected before querying.
    const todoTasks=await Todo.find(); //Fetches ALL documents from MongoDB.
    return NextResponse.json(todoTasks); //Sends the task list to frontend

}

//Add New Task
export async function POST(req:Request){ //Defining Post api to add new task
    const data=await req.json();
    await connectdb();

    //checking duplicates
    const duplicateExists=await Todo.findOne({
        text:{$regex: `^${data.text}$`, $options: "i"}
    });
    if(duplicateExists){
        return NextResponse.json(
            {error:"This task already exists"},
            {status:400}
        );
    } 

    const newTodoTask=await Todo.create(
        {
            text:data.text,
            isCompleted:data.isCompleted,
        }
    ); //Creates a new task in MongoDB
    return NextResponse.json(newTodoTask); //Returns to frontend
}

//Delete Task
export async function DELETE(req:Request){
    const {idToDel}=await req.json();
    await connectdb();
    await Todo.findByIdAndDelete(idToDel);
    return NextResponse.json({success:true});
}

//Complete / Update Task
export async function PUT(req:Request){
    const {idToComp}=await req.json();
    await connectdb();
    const currentTask = await Todo.findById(idToComp);
    if(!currentTask){
        return NextResponse.json({error:"Task not found"}, {status:404});
    }

    const updated=await Todo.findByIdAndUpdate(
        idToComp,
        {isCompleted:!currentTask.isCompleted},
        {new:true}
    );
    return NextResponse.json(updated);
}