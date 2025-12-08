//connectiong our app to mongodb

import mongoose from "mongoose";
const mongodb_url="";
export const connect=asynce()=>{
    if(mongoose.connection.readyState>=1){
        return;
    }
    return mongoose.connect(mongodb_url)
        
}