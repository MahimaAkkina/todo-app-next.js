//connectiong our app to mongodb

import mongoose from "mongoose";
const mongodb_url="mongodb+srv://mahimaakkina_db_user:GodisLove%40143@cluster0.l6kxe98.mongodb.net/TodoTask";
export const connectdb=async()=>{
    if(mongoose.connection.readyState>=1){
        return;
    }
    return mongoose.connect(mongodb_url)
        
}