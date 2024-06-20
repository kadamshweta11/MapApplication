import React,{useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import "../Styling/Login.css";
import Footer from '../components/Footer';
import {getUserDataById} from '../api';


 const Login=()=>{
const { register, handleSubmit, formState: { errors } } = useForm();
const [error,setError]=useState('');
const [success, setSuccess] = useState('');
const navigate = useNavigate(); 


const handleLogin=async(data)=>{
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
      const userData = await getUserDataById(userId); 
      console.log('User Data:', userData);
      setSuccess('Login Successful!');
          setError(''); 
          navigate('/home'); // Redirect to home page
        } else {
          setError(response.data.message);
          setSuccess(''); 
        }
    }catch(error){
        console.log('Error during login:', error);
      setError('Invalid credentials. Please try again.');
      setSuccess(''); 
    }
};
return(
  <div>
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
      <button onClick={() => navigate('/register')}>Register</button> 
    </div>
    
    </div>
    <Footer />
    </div>
    
);

 };
 export default Login;