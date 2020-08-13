import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  status: boolean,
  email: string,
  password: string,
  passwordToken: string,
  fullname: string,
  address: string,
  pictureKey: string,
}

const UserSchema = new Schema(
  {
    status: { type: Boolean, required: true, default: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokenPassword: { type: String },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    pictureKey: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>('User', UserSchema, 'user');

export default UserModel;
