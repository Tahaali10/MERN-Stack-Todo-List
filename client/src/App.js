import Home from "./Components/Home.jsx";
import Header from "./Components/Partials/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import { useState } from "react";

function App() {

  const info = localStorage.getItem('user');

  const [user, setUser] = useState(JSON.parse(info))
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>)
}


export default App;
