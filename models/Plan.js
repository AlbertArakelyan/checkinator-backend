import mongoose from 'mongoose';

const { Schema } = mongoose;

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  planItems: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'PlanItem',
  },
  color: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

export default mongoose.model('Plan', planSchema);