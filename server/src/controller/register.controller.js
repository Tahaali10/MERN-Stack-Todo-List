import { validationResult } from "express-validator";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import jwt from "jsonwebtoken"
import User from "../models/User.js";

import bcrypt from 'bcrypt'

const Register = async (req, res) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

        // If user is not in database only then it will create so this code is for that portion if user exists it will give error
    const userExist=await User.findOne({ $or:[{
            email:email
        },{
            username:username
        }]})
    if (userExist){
        return res.json(jsonGenerate(StatusCode.UPROCESSABLE_ENTITY,"User or email already exists"))
    }


        //savetoDb
        try{
            const result=await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username
            })

            const token=jwt.sign({userId:result._id},JWT_TOKEN_SECRET)

            res.json(jsonGenerate(StatusCode.SUCCESS,"Registration Successful",{userId:result._id,token:token}))
        }catch(error){
            console.log(error);
            // handle the error appropriately, e.g., send an error response
            res.status(500).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Internal Server Error"));
        }
    
    } else {
        res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation Error", errors.mapped()));
    }
}

export default Register;
