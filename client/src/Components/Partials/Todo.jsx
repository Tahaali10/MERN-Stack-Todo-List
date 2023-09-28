import moment from 'moment/moment';
import React from "react";
import { deleteTodoApi, markTodoApi } from '../../Services/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo({todo,setRefreshList}) {

const handleDelete=async()=>{
const result =await deleteTodoApi({
  todo_id:todo._id
})
console.log("delete todo",result)
console.log(todo._id)

if(result.data.status===200){
  setRefreshList(new Date())
  toast("Deleted!")
}else{
  toast("Failed to Delete. Please Try Again!")
}}

const handleMarkTodo=async()=>{
  const result =await markTodoApi({
    todo_id:todo._id
  })
  console.log("Mark Todo",result)
  
  if(result.data.status===200){
    setRefreshList(new Date())
    toast(result.data.message)
  }else{
    toast(result.data.message)
  }
}

       
  return (
    <div className="col-sm-3 mx-3 my-2 alert bg-light">
      <div className="card-header">
        {
          todo.isCompleted?'Completed':'Not Completed'
        }
      </div>
      <div className="card-body">
        <h4 className="card-title">{todo.desc}</h4>
        <p className="card-text">{moment(todo.date).fromNow()}</p>
      </div>

     <div className="actionButton" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="deleteButton">
        <button style={{background:'red'}} onClick={handleDelete}>Delete</button>
      </div>
      <div className="markTodo">
        <button onClick={handleMarkTodo}>{todo.isCompleted?'InCompleted':'Completed'}</button>
      </div>
     </div>
    </div>
  );
}

export default Todo;
