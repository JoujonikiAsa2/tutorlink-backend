import mongoose, { model, Types } from 'mongoose'
import { TTutor, TutorModel } from './tutor.interface'

const TutorSchema = new mongoose.Schema<TTutor>(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    profileImage: {
      type: String,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    medium: {
      type: String,
      required: true,
    },
    rating: {
      totalStudent: { type: Number, default: 0 },
      ratingValue: { type: Number, default: 0 },
    },
    educationalBg: {
      level: { type: String, required: true },
      institute: { type: String, required: true },
      major: { type: String, required: true },
    },
    preferredClass: {
      type: [String],
      required: true,
    },
    preferredSubjects: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    tutionFee: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)


TutorSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Tutor.findOne({ email }).select('+password')
  return existingUser
}

export const Tutor = model< TTutor, TutorModel>('Tutor', TutorSchema)
