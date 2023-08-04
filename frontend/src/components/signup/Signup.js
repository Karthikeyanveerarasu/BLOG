import "./signup.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function Login() {
//// navigate
const navigate = useNavigate();

  const [email, Setemail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const handlesignin = async() => {
    if(email=="" || password=="" || name==""){
      toast.error("wrong credentials")
      return;
    }
  await axios.post('http://localhost:3002/register',{
    email:email,
    password : password,
    name:name
  }).then((response)=>{
  if(response.data.already){
       toast.error(response.data.already)
       return;
  }
  if(response.data.success){
    
    toast.success(response.data.success)
    navigate("/login")
    return;
  }
  })
  };
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "20px" }}
      >
        <div
          className="card shadow"
          style={{ minWidth: "300px", width: "60%" }}
        >
          <div className="card-title text-center mt-2 text-uppercase ">
            <h4>Sign up</h4>
          </div>
          <div className="card-body ">
            <div style={{ minWidth: "250px", width: "60%", margin: "auto" }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="name"
                  placeholder="name@example.com"
                  required={true}
                  onChange={(e) => Setemail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="User name"
                className="mb-3"
              >
                <Form.Control
                  type="name"
                  placeholder="name@example.com"
                  required={true}

                  onChange={(e) => SetName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required={true}

                  onChange={(e) => SetPassword(e.target.value)}
                />
              </FloatingLabel>
              <div>
                <button
                  className="btn btn-dark rounded w-100 mt-4 signup"
                  onClick={handlesignin}
                >
                  Sign Up
                </button>
               <a style={{
                textDecoration:"none",
                color:"black"
               }} href="/login"> <p className="text-center mt-3 fs-6" style={{
                  cursor:"pointer"
                }}>Already a user ? login now</p></a>   
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
