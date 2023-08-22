import mongoose from 'mongoose';

const planItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

export default mongoose.model('PlanItem', planItemSchema);