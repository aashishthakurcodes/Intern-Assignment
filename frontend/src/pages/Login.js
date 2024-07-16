import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import { FaUserCircle } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils";
import Form from "react-bootstrap/Form";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:8080/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError("Server Error", err);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="signInbOx">
          <div className="signIn">
            <p>SIGN IN</p>
          </div>
        </div>
        <div className="usericon">
        <FaUserCircle style={{ fontSize: "6rem", color: "rgb(147, 145, 145)" }} />
         
        </div>

        <div className="container">
          <Form onSubmit={handleLogin}>
           
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                name="email"
                value={loginInfo.email}
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={loginInfo.password}
                style={{ backgroundColor: "#9CA2A2 " }}
              />
            </Form.Group>
           
           
            <div className="loginspan">
             
              <span  style={{color:"white"}}>
                New User ? Click to Sign up
              </span>
              <div><Link to="/signup">Sign UP</Link></div>
            </div>
            <div className="signBTN">
            <Button className="submit" variant="primary" type="submit" >
              LOGIN
            </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
