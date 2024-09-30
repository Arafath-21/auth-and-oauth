/* eslint-disable no-unused-vars */
import mongoose, { Schema, model } from 'mongoose';
/* eslint-enable no-unused-vars */

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true },
    isVerified: { type: Boolean, default: false },
    details: { type: Schema.Types.ObjectId, ref: 'Details' }, // Correctly refer to Schema.Types.ObjectId
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: 'User', // Name of the MongoDB collection
    versionKey: false, // Disable the __v field
  }
);

// Create the user model from the schema
const userModel = model('User', UserSchema);

export default userModel;
