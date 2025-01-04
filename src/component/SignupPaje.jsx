import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './cssfiles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEmail } from './EmailContext'; 

const SignupPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Using useNavigate hook for redirection
  const { updateEmail } = useEmail(); 
  const postdata = async () => {
    if (!name || !age || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    
    if (!isEmailValid) {
      toast.error("Please provide a valid email address");
      return; // Prevent further execution if email is invalid
    }

    try {
      const res = await axios.post("http://localhost:3000/signup", { name, age, email, password });
      updateEmail(email);
      if (res.data) {
        // Show success toast and navigate after it's dismissed
        toast.success("You have successfully signed up", {
          onClose: () => {
            navigate("/"); // Redirect to homepage or other page after success
          }
        });
      } else {
        toast.error("There was an issue with your signup");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='signup'>
      <div className='mainsignup'>
        <h1>SIGNUP PAGE</h1>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
          noValidate
          autoComplete="off"
        >
          <div className='inputfields'>
            <TextField
              id="outlined-name-input"
              label="Enter Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="current-text"
            />
            <TextField
              id="outlined-mail-input"
              label="Enter Mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="current-mail"
            />
            <TextField
              id="outlined-age-input"
              label="Enter Age"
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              autoComplete="current-number"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div>
            <p> If you already signed up, then go to <Link to="/login"><strong>Login..</strong></Link> </p>
          </div>
        </Box>

        <div className='btn'>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={postdata}>
              Signup
            </Button>
          </Stack>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
