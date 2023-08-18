import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isEmailVerified: { type: Boolean },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

export default mongoose.model('User', userSchema);