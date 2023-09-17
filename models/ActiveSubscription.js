import mongoose from 'mongoose';

const { Schema } = mongoose;

const activeSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export default mongoose.model('ActiveSubscription', activeSubscriptionSchema);