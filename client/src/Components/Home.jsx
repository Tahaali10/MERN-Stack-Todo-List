import React, { useState } from "react";
import Header from "./Partials/Header";
import Todo from "./Partials/Todo";
import AddTodoModal from "./Partials/AddTodoModal";
import { useEffect } from "react";
import { getTodoListApi, getToken } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [refreshList]);

  async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todoList", result);
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos);
    }
  }
  return (
    <div>
      <ToastContainer/>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
      {
        list.map((todo)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
      }
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          // className="btn btn-outline-light"
        >
          ADD
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
}

export default Home;
