import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  score: { type: Number },
  id:Number
});

const Users = mongoose.model('Users', userSchema);

export { Users };
