const express=require('express');
const router=express.Router();
const School=require('../models/School');
const { json } = require('body-parser');

// Get all schools
router.get('/',async(req,res)=>{
    try{
        const schools=await School.find();
        res.json(schools);

    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Create a new School
router.post('/',async(req,res)=>{
const school=new School(req.body);
try{
    const newSchool=await school.save();
    res.status(201).json(newSchool);
}catch(err){
    res.status(400).json({message:err.message});
}
});

// Get a single school by id
router.get('/:id',async(req,res)=>{
    try{
        const school=await School.findById(req.params.id);
        if(school==null){
            return res.status(404).json({message:'School Not Found'});
        }
        res.json(school);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// Update a school
router.put('/:id',async(req,res)=>{
try{
    const updatedSchool=await School.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedSchool);
}catch(err){
    res.status(400).json({message:err.message});
}
});

// delete a school
router.delete('/:id',async(req,res)=>{
    try{
        const deletedSchool=await School.findByIdAndDelete(req.params.id);
        res.json(deletedSchool);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;
