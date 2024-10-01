import { userModel } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUserDetails = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await userModel.findById(req.user._id).populate('details');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      isVerified: user.isVerified,
      details: user.details,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
