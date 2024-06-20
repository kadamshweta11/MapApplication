const express=require('express');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const axios = require('axios');

const router=express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               favoriteFacility:
 *                 type: string
 *               homeAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or bad request
 *       500:
 *         description: Server error
 */
//Register a New User
router.post('/register',async(req,res)=>{
    const {username,email,password,favoriteFacility, homeAddress}=req.body;
    console.log('Register endpoint hit');  
    const openCageApiKey = process.env.OPENCAGE_API_KEY;
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
        // Geocode the home address
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(homeAddress)}&key=${openCageApiKey}`);
    const { lat, lng } = response.data.results[0].geometry;

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const user=new User({
            username,
            email,
            password,
            favoriteFacility, 
            homeAddress, 
            homeCoordinates: {
                type: 'Point', // Adjust as per schema
                coordinates: [lng, lat], // Example coordinates; adjust as needed
            },
        });
        await user.save();
        console.log('User saved');  // Debugging statement
        res.status(201).json({message:'User Registered Successfully'});

    }catch(error){
        console.error('Error during registration:', error);  // Debugging 
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }
});


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
//Login  a User
router.post('/login',async(req,res)=>{
    console.log('Login endpoint hit'); 
    console.log(req.body); 
    const {email,password}=req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email and password' });
    }

    try{
        const user=await User.findOne({email});
        console.log('User found:', user); 
        if(!user){
            console.log('User not found'); 
            return res.status(400).json({message:'Invalid Credentials'});
        }
        console.log('Entered password:', password); 
        console.log('Stored hashed password:', user.password);
        //  const hashedPassword = await bcrypt.hash(password, 10);
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        console.log('Password match result:', isMatch);
        if (!isMatch) {
            console.log('Password does not match'); 
            return res.status(400).json({ message: 'Invalid Password credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ message: 'User Logged In successfully', token,
            userId: user._id, 
             });
        
    }
    catch (error) {
       
        console.error('Error during login:', error); 
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;