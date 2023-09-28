import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
// import User from "../models/User.js";

export const MarkTodo=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped()))
    }
    try{
        const todo=await Todo.findOneAndUpdate({
            _id:req.body.todo._id,
            userId:req.userId
        },[
            {
                $set:{
                    isCompleted:{
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ]
        )
        if(todo){
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Updated!",todo))
        }
    }catch(error){
        return res.json(jsonGenerate(StatusCode.UPROCESSABLE_ENTITY,"Could Not Updated!",error))

    }
}