import mongoose from 'mongoose';

export interface EmployeeDoc extends mongoose.Document {
  imageUrl: string;
  name: string;
  last_name: string;
  job_role: string;
  salary: Number;
  age: Date;
  createdAt?: Date;
}

const EmployeeSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  job_role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployeeModel = mongoose.model<EmployeeDoc>(
  'employee',
  EmployeeSchema,
  'employee',
);

export default EmployeeModel;
