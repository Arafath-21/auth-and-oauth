import { Schema, model } from 'mongoose';

const detailsSchema = new Schema(
  {
    name: { type: String, required: true },
    batch: { type: String, required: true },
    course: { type: String, required: true },
  },
  { timestamps: true, collection: 'User', versionKey: false }
);

const detailModel = model('Detail', detailsSchema);

export default detailModel;
