import { Schema, model } from 'mongoose';

const detailsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    batch: { type: String },
    course: { type: String },
  },
  { timestamps: true, collection: 'Details', versionKey: false }
);

export const detailModel = model('Details', detailsSchema);

// export default detailModel;
