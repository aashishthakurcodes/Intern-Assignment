import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import { FaUserCircle } from "react-icons/fa";
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:8080/api/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError("Server Error",err);
        }
    }

    return (

        <div className="container">
            <h2>Login Form</h2>
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
           
            <span>
              Already have an account ?
            </span>
            <div><Link to="/login">Login</Link></div>
          </div>
          <div className="signBTN">
          <Button className="submit" variant="primary" type="submit">
            Submit
          </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
     
        
    )
}

export default Login
// <div className='container'>
        //     <h1>Login</h1>
        //     <form onSubmit={handleLogin}>
        //         <div>
        //             <label htmlFor='email'>Email</label>
        //             <input
        //                 onChange={handleChange}
        //                 type='email'
        //                 name='email'
        //                 placeholder='Enter your email...'
        //                 value={loginInfo.email}
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor='password'>Password</label>
        //             <input
        //                 onChange={handleChange}
        //                 type='password'
        //                 name='password'
        //                 placeholder='Enter your password...'
        //                 value={loginInfo.password}
        //             />
        //         </div>
        //         <button type='submit'>Login</button>
        //         <span>Does't have an account ?
        //             <Link to="/signup">Signup</Link>
        //         </span>
        //     </form>
        //     <ToastContainer />
        // </div>