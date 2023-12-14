import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});
