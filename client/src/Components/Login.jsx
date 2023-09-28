import React, { useEffect, useState } from "react";
import { login } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Partials/Header'


function Login(user,setUser) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();

  useEffect(()=>{
    const user=localStorage.getItem('user')
if(user){
  navigation('/')
}
  },[])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", result);
    setErrors(null);

    if (result.status == 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };
  return (
    <>
<Header/>
    <div className="container">
              <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5">
          <h3 className="text-center mb-4">Login</h3>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={handleChange}
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter your username"
              />
              {errors?.username && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.username.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.password.msg}
                </small>
              )}
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary btn-block"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
