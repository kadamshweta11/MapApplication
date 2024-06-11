const express=require('express');
const router=express.Router();
const SocialTeenagerProject=require('../models/SocialTeenagerProject');

//get all social teenager projects
router.get('/',async(req,res)=>{
    try{
        const socialTeenagerProjects=await SocialTeenagerProject.find();
        res.json(socialTeenagerProjects);
        }catch(err){
            res.status(500).json({message:err.message});
        }
});

//create a new social teenager projects
router.post('/',async(req,res)=>{
    const socialTeenagerProject = new SocialTeenagerProject(req.body);
    try {
      const newSocialTeenagerProject = await socialTeenagerProject.save();
      res.status(201).json(newSocialTeenagerProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

//Get a single social teenager project by ID
router.get('/:id', async (req, res) => {
    try {
      const socialTeenagerProject = await SocialTeenagerProject.findById(req.params.id);
      if (socialTeenagerProject == null) {
        return res.status(404).json({ message: 'Social teenager project not found' });
      }
      res.json(socialTeenagerProject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //Update a social teenager project by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedSocialTeenagerProject = await SocialTeenagerProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedSocialTeenagerProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Delete a social teenager project by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedSocialTeenagerProject = await SocialTeenagerProject.findByIdAndDelete(req.params.id);
      res.json(deletedSocialTeenagerProject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;