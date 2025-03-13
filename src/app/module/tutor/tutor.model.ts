import mongoose, { model, Types } from 'mongoose'
import { TTutor, TutorModel } from './tutor.interface'
const educationSchema = {
  group: {
    type: String,
  },
  institute: {
    type: String,
  },
  passingYear: {
    type: String,
  },
  result: {
    type: String,
  },
}

const TutorSchema = new mongoose.Schema<TTutor>(
  {
    id: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
    },
    age: {
      type: Number,
      required: true,
      min: 18
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    profileImage: {
      type: String,
    },
    experience: {
      type: Number,
      min: 0,
    },
    medium: {
      type: String,
    },
    rating: {
      totalStudent: { type: Number, default: 0 },
      ratingValue: { type: Number, default: 0 },
    },
    yourLocation: {
      type: String,
      required: true
    },
    secondaryEducation: educationSchema,
    higherEducation: educationSchema,
    graduation: {
      studyType: {
        type: String,
      },
      institute: {
        type: String,
      },
      department: {
        type: String,
      },
      passingYear: {
        type: String,
      },
      result: {
        type: String,
      },
    },
    classes: {
      type: [String],
      required: true
    },
    subjects: {
      type: [String],
      required: true
    },
    preferedLocation: {
      type: [String],
      required: true
    },
    availability: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    hourlyRate: {
      type: Number,
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

export const Tutor = model<TTutor, TutorModel>('Tutor', TutorSchema)
