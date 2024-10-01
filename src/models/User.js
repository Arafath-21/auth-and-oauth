import { Schema, model } from 'mongoose';
import { detailModel } from './Details.js';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: undefined }, // To store hashed reset token
    resetPasswordExpire: { type: Date, default: undefined }, // To store expiration time of the reset token
    details: [{ type: Schema.Types.ObjectId, ref: 'Details' }], // Correctly refer to Schema.Types.ObjectId
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: 'User', // Name of the MongoDB collection
    versionKey: false, // Disable the __v field
  }
);

// Pre-save hook to create Details document
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const userDetail = new detailModel({
      userId: this._id,
      name: this.name,
      batch: '',
      course: '',
    });

    await userDetail.save();
    this.details = userDetail._id;
  }
  next();
});

// Post-save hook to update user with details ID
UserSchema.post('save', async function (doc, next) {
  await model('User').findByIdAndUpdate(doc._id, { details: doc.details });
  next();
});

export const userModel = model('User', UserSchema);
