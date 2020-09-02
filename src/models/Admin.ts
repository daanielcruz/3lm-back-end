import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface AdminDoc extends mongoose.Document {
  password: string;
  email: string;
  createdAt?: Date;
}

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre<AdminDoc>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

const AdminModel = mongoose.model<AdminDoc>('admin', AdminSchema, 'admin');

export default AdminModel;
