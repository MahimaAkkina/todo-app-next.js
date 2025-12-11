import mongoose from "mongoose";
const todoSchema=new mongoose.Schema({
    text:String,
    isCompleted:Boolean,
});

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);