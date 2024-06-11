import React,{useState} from 'react';
import axios from 'axios';
import  './Card';
import '../Styling/Register.css';

import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const navigate = useNavigate(); // Use useNavigate hook

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/auth/register',{username,email,password});
            setMessage(res.data.message);
        }catch(error){
            console.error('Error during registration:', error);
            setMessage('Error Registering User');
        }

    };

    return(
        <div className="register-container">
            <div className='card'>
            <h1>
                Register
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={()=>navigate('/login')}>Login</button>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;