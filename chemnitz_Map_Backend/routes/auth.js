const express=require('express');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const router=express.Router();

//Register a New User
router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    console.log('Register endpoint hit');  

    try{
        const userExists=await User.findOne({email});
        if(userExists){
            console.log('User already exists');  // Debugging statement
            return res.status(400).json({message:'User Already Exists'});
        }

         // Ensure the password is not empty
         if (!password || password.trim().length === 0) {
            return res.status(400).json({ message: 'Password cannot be empty' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const user=new User({
            username,
            email,
            password,
        });
        await user.save();
        console.log('User saved');  // Debugging statement
        res.status(201).json({message:'User Registered Successfully'});

    }catch(error){
        console.error('Error during registration:', error);  // Debugging s
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
});

//Login  a User
router.post('/login',async(req,res)=>{
    console.log('Login endpoint hit'); // Add this line
    console.log(req.body); // Log request body
    const {email,password}=req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email and password' });
    }

    try{
        const user=await User.findOne({email});
        console.log('User found:', user); // Add this line
        if(!user){
            console.log('User not found'); // Add this line
            return res.status(400).json({message:'Invalid Credentials'});
        }
        console.log('Entered password:', password); // Log entered password
        console.log('Stored hashed password:', user.password);
        //  const hashedPassword = await bcrypt.hash(password, 10);
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        console.log('Password match result:', isMatch);
        if (!isMatch) {
            console.log('Password does not match'); // Add this line
            return res.status(400).json({ message: 'Invalid Password credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User Logged In successfully', token:token });
        
    }
    catch (error) {
       
        console.error('Error during login:', error); // Add this line
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;