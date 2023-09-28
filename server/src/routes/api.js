import express from "express";
import Register from "../controller/register.controller.js";
import Login from "../controller/login.controller.js";
import { RegisterSchema } from "../validatorSchema/RegisterSchema.js";
import { LoginSchema } from "../validatorSchema/LoginSchema.js";
import { createTodo } from "../controller/todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controller/todolist.controller.js";
import { MarkTodo } from "../controller/marktodo.controller.js";
import { RemoveTodo } from "../controller/removetodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router()

apiRoute.post('/register', RegisterSchema, Register)
apiRoute.post('/login', LoginSchema, Login)

//protected routes

apiProtected.post(
    "/createTodo",
    [check("desc", "Todo description is required").exists()],
    createTodo
)
apiProtected.post(
    "/markTodo",
    [check("todo_id", "Todo id is required").exists()],
    MarkTodo
)
apiProtected.post(
    "/deleteTodo",
    [check("desc", "Todo description is required").exists()],
    RemoveTodo
)

apiProtected.get('/todolist', GetTodos)

export default apiRoute;