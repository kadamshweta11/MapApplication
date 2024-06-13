import React,{useState} from 'react';
import axios from 'axios';
import  './Card';
import '../Styling/Register.css';

import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [favoriteFacility, setFavoriteFacility] = useState(''); // Define favoriteFacility state
    const [homeAddress, setHomeAddress] = useState('');
    const [message,setMessage]=useState('');
    const navigate = useNavigate(); // Use useNavigate hook

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/auth/register',{username,email,password,favoriteFacility,homeAddress});
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
                <div>
        <label>Favourite Facility:</label>
        <select
            value={favoriteFacility}
            onChange={(e) => setFavoriteFacility(e.target.value)}
            required
        >
            <option value="">Select a Facility</option>
            <option value="schools">Schools</option>
            <option value="kindergardens">Kindergardens</option>
            <option value="socialChildProjects">Social Child Projects</option>
            <option value="socialTeenagerProjects">Social Teenager Projects</option>
        </select>
    </div>
    <div>
        <label>Home Address:</label>
        <input
            type="text"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            placeholder="Enter Your Home Address"
            required
        />
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