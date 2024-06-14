// / routes/user.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { updateUser } = require('../controllers/userController');
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

//update the user
// PUT /api/user/:id
router.put('/:id', protect, updateUser);

// DELETE user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
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