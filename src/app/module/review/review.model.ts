import mongoose, {model } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema = new mongoose.Schema<TReview>({
  tutorId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Review = model<TReview>('Review', ReviewSchema);

