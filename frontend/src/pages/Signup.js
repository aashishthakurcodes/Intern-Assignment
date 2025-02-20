import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import { FaUserCircle } from "react-icons/fa";


import Form from "react-bootstrap/Form";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    dateofbirth: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, dateofbirth } = signupInfo;
    if (!name || !email || !password || !dateofbirth) {
      return handleError("All fields are required");
    }
    try {
      const url = `http://localhost:8080/api/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="user-container">
      <div className="main">
        <div className="signInbOx">
          <div className="signIn">
            <p>SIGN UP</p>
          </div>
        </div>
        <div className="usericon">
        <FaUserCircle style={{ fontSize: "6rem", color: "rgb(147, 145, 145)" }} />
         
        </div>

        <div className="container">
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={handleChange}
                name="name"
                value={signupInfo.name}
                autoFocus
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                name="email"
                value={signupInfo.email}
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={signupInfo.password}
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Control
                type="date"
                 placeholder="Enter your Date of Birth"
                onChange={handleChange}
                name="dateofbirth"
                value={signupInfo.dateofbirth}
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>
           
            <div className="loginspan">
             
              <span  style={{color:"white"}}>
                Already have an account ?
              </span>
              <div><Link to="/login">LOGIN</Link></div>
            </div>
            <div className="signBTN">
            <Button className="submit" variant="primary" type="submit" style={{background:"#3CD0F1",color:"black",border:"none"}}>
              REGISTER
            </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </div>
   
  );
}

export default Signup;
