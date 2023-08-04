import "./navbar.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { end } from "@popperjs/core";
export default function AppBar() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pagemaranum = (value)=>{
    const email = localStorage.getItem("email");
    if(email === "" || email===null){
      toast.error("Sign Up and Dive into Blogs!");
      
      navigate("/signup")
      handleClose();
      return;
    }
    if(value ==="home"){
    navigate("/")
    handleClose();
    return;
    }
 if(value === "post"){
  navigate("/post")
  handleClose();
  return;
 }
 if(value === "save"){
  navigate("/saved")
  handleClose();
  return;
 }
 if(value === "logout"){
  localStorage.clear();
   toast.promise(
    new Promise((resolve)=>setTimeout(resolve,1000)),
    {
      loading : "Logging out ...",
      success :<b>Logout successfully</b>,
      error : <b>Something went wrong</b>
    }
  )
  navigate("/signup")
  handleClose();
 }

  }
  return (
    <div>
      <Toaster 
      position="top-center"
      />
      <Offcanvas show={show} placement={end} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>

          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="text-center mt-3 off">
            <p onClick={()=>pagemaranum("home")}>Home</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <p onClick={()=>pagemaranum("post")}>Post</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <p onClick={()=>pagemaranum("save")}>Saved</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <button className="btn btn-dark w-100 p-2 mt-2 ithuvera" onClick={()=>{
              navigate("/signup")
              handleClose();
              }}>Sign up</button>
          </div>
          <div className="text-center mt-3  off">
            <button className="btn btn-danger  p-2 w-100 ithuvera w-100" onClick={()=>pagemaranum("logout")}>Logout</button>
          </div>
          
          <hr />
        </Offcanvas.Body>
      </Offcanvas>
      <nav>
        <h2>
        <img src="/image/logo.png" alt="Logo" width="100px"/>

        </h2>
        <div>
          <ul>
            <li onClick={()=>pagemaranum("home")}>Home</li>
            <li onClick={()=>pagemaranum("post")}>Post</li>
            <li onClick={()=>pagemaranum("save")}>Saved</li>
            <li onClick={()=>pagemaranum("logout")}>Logout</li>
          <li className="ithuvera">  <button className="btn btn-dark " onClick={()=>navigate("/signup")}>Sign up</button></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleShow}>
          <i id="bar" className="fas fa-bars"></i>
        </div>
      </nav>
    </div>
  );
}
