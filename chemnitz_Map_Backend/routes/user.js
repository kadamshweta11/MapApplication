// / routes/user.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/updateFavoriteFacility', protect, async (req, res) => {
  const { userId, favoriteFacility } = req.body;
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.favoriteFacility = favoriteFacility;
      await user.save();
      res.json({ favoriteFacility: user.favoriteFacility });
  } catch (error) {
      console.error('Error updating favorite facility:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

  // Update home address
router.put('/updateHomeAddress', protect, async (req, res) => {
  const { userId, homeAddress, homeCoordinates } = req.body;
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.homeAddress = homeAddress;
      user.homeCoordinates = homeCoordinates;
      await user.save();
      res.json({ homeAddress: user.homeAddress, homeCoordinates: user.homeCoordinates });
  } catch (error) {
      console.error('Error updating home address:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports = router;