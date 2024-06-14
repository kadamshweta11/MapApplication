import React,{useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import './Card';
import "../Styling/Login.css";
import {getUserDataById} from '../api';


 const Login=()=>{
  const { register, handleSubmit, formState: { errors } } = useForm();
const [error,setError]=useState('');
const [success, setSuccess] = useState('');
const navigate = useNavigate(); // Use useNavigate hook


const handleLogin=async(data)=>{

    // e.preventDefault();
    // console.log('handleLogin called with data:', data);
    const { email, password } = data;
    try{
        const response=await axios.post('http://localhost:5000/api/auth/login',data);
        console.log('Login response:', response.data); 
        if (response.data.message === 'User Logged In successfully') {
          console.log("Log In Successful");
          const { token, userId } = response.data;
      
      // Store token and userId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', email);
      // Fetch user data after successful login
      // Fetch user data after successful login
      const userData = await getUserDataById(userId); // Ensure userId is available here
      console.log('User Data:', userData);
      setSuccess('Login Successful!');
          setError(''); // clear error message
          // localStorage.setItem('token', response.data.token);
          // Retrieve username from the form data
      // const storedUsername = email;
      
          // Store username in local storage
      // localStorage.setItem('username', storedUsername);
      // console.log('User Data:', userDataResponse.data); // Log user data for verification
      // Optionally store user data in localStorage or state
      // localStorage.setItem('userData', JSON.stringify(userDataResponse.data));
          // window.location.href = '/';
          navigate('/'); // Redirect to home page
        } else {
          setError(response.data.message);
          setSuccess(''); // clear success message
        }
    }catch(error){
        console.log('Error during login:', error);
      setError('Invalid credentials. Please try again.');
      setSuccess(''); // clear success message
    }
};
return(
  <div className="login-container">
    <div className="card">
        <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} 
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { required:  'Email is required' })}
            placeholder="Enter your email"
            
          />
          { errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
           </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must have at least 8 characters' } })}
            placeholder="Enter your password"
            
          />
          { errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
       
      </form>
      <button onClick={() => navigate('/register')}>Register</button> {/* Add Register button */}
    </div>
    </div>
);
 };
 export default Login;