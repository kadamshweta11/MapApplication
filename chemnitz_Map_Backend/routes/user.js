// / routes/user.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/updateFavoriteFacility', protect, async (req, res) => {
    const { userId, favoriteFacility } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { favoriteFacility },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Error updating favorite facility' });
    }
  });

  router.put('/updateHomeAddress', protect, async (req, res) => {
    const { userId, homeAddress, homeCoordinates } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { homeAddress, homeCoordinates },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Error updating home address' });
    }
  });

  module.exports = router;