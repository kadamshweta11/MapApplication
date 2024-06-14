const User=require('../models/User');

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

module.exports = { updateUser };