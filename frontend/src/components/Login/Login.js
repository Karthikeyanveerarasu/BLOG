import "./login.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
export default function Login() {
  const [email, Setemail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate()
  const [name, SetName] = useState("");
  
  const handlesignin = async () => {
    if(email=="" || password==""){
      toast.error("wrong credential")
      return
    }
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email: email,
        password: password,
      });
  
      if (response.data.loginfailed) {
        toast.error("wrong credential")
        return;
      }
  
      if (response.data) {
        console.log(response.data);
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 1000)),
          {
            loading: 'Logging in...',
            success: <b>Hi {response.data[0].name}</b>,
            error: <b>Something went wrong.</b>,
          }
        );
        localStorage.setItem("name",response.data[0].name);
        localStorage.setItem("userid",response.data[0].id);
        localStorage.setItem("email",email);
        SetPassword("");
        Setemail("");
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error if necessary
    }
  };
  
  return (
    <>
    <Toaster 
     position="top-center"
     reverseOrder={false}
    />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "30px" }}
      >
        <div
          className="card shadow"
          style={{ minWidth: "300px", width: "60%" }}
        >
          <div className="card-title text-center mt-2 text-uppercase ">
            <h4>Log In</h4>
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
                  value={email}
                  onChange={(e) => Setemail(e.target.value)}
                />
              </FloatingLabel>
            
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
              </FloatingLabel>
              <div>
                <button
                  className="btn btn-dark rounded w-100 mt-4 signup"
                  onClick={handlesignin}
                >
                 Log In
                </button>
                <p className="text-center mt-4 fs-6" style={{cursor:"pointer"}}
                onClick={()=>navigate("/signup")}
                >New User ? SignUp Now</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}
