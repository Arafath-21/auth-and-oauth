import userModel from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).populate('Details');

  res.json(user);
});

export default {
  getUserDetails,
};
