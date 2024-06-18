import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    priority:{type:String, enum:['low', 'medium','high'], default:'medium'},
    date: {type:Date},
    userId:{type:mongoose.Schema.ObjectId, ref:'user', required: true},
    status:{type:String, enum:['pending', 'progress','completed'], default:'pending'}

})

export const taskModel = mongoose.model("task", taskSchema);