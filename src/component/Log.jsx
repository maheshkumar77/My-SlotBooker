import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import './cssfiles/log.css';
import { useEmail } from './EmailContext';

const Log = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { updateEmail } = useEmail(); 
    const navigate = useNavigate(); // Initialize the navigate function
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:3000/login', { email, password });
        if (res.data.message) {  
          updateEmail(email);
          console.log('Login successful', res.data);
          toast.success('Login sucessfull');
          navigate('/');  
        } else {
          setErrorMessage('Invalid email or password');
          toast.error('Please provide corect credential');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('Something went wrong, please try again later.');
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className='login'>
    
        <div className='logmain'>
        <h1>LOGIN PAGE</h1>
        <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
      noValidate
      autoComplete="off"
    >
    <div className='inputfields'>
          <TextField
              id="outlined-password-input"
              label="Enter Mail"
              type="email"
              autoComplete="current-text"
              value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="email"
              autoComplete="current-text"
              value={password}
             onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
    </Box>
    <div className='btn'>
    <Stack direction="row" spacing={2}>
    <Button variant="contained" color="success"  onClick={handleLoginSubmit}>
        Login
      </Button>
      <Button variant="contained" color="success">
        <Link to="/signup">Register</Link>
      </Button>
    </Stack>
    </div>
        </div>
      </div>
    );
  };
  export default Log;
  
  