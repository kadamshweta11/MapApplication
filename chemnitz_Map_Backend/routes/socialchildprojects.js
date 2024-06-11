const express = require('express');
const router = express.Router();
const SocialChildProject = require('../models/SocialChildProject');

// Get all social child projects
router.get('/', async (req, res) => {
    try {
      const projects = await SocialChildProject.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new social child project
  router.post('/', async (req, res) => {
    const project = new SocialChildProject(req.body);
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Get a single social child project by ID
router.get('/:id', async (req, res) => {
    try {
      const project = await SocialChildProject.findById(req.params.id);
      if (project == null) {
        return res.status(404).json({ message: 'Social child project not found' });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update a social child project by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedProject = await SocialChildProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a social child project by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSocialChildProject = await SocialChildProject.findByIdAndDelete(req.params.id);
    res.json(deletedSocialChildProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
