import verifyToken from '../utils/verifyToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { userModel } from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = verifyToken(token);
      req.user = await userModel.findById(decoded.id).select('-password');
      console.log(req.user);

      next();
    } catch {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// export default { protect };
