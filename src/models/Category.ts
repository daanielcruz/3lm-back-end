import mongoose from 'mongoose';

export interface CategoryDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
}

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model<CategoryDoc>(
  'category',
  CategorySchema,
  'category',
);

export default CategoryModel;
