import React, { useEffect, useState } from "react";
import { register } from "../Services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./Partials/Header";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
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

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const result = await register(form);
    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("something went wrong,please try againx");
    }
  };

  return (
    <>
    <Header/>
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5">
          <h2>Registration Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
              {errors?.name && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.name.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter a username"
              />
              {errors?.username && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.username.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                onChange={handleInputChange}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
              {errors?.email && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.email.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                onChange={handleInputChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter a password"
              />
              {errors?.password && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.password.msg}
                </small>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
