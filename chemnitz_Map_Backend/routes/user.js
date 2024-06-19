// / routes/user.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { updateUser } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/user/updateFavoriteFacility:
 *   put:
 *     summary: Update user's favorite facility
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               favoriteFacility:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite facility updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/user/updateHomeAddress:
 *   put:
 *     summary: Update user's home address
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               homeAddress:
 *                 type: string
 *               homeCoordinates:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: ['Point']
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *     responses:
 *       200:
 *         description: Home address updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, updateUser);

// DELETE user by ID

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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