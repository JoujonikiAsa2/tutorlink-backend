import mongoose, { model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const UserSchema = new mongoose.Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    age: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
    },
    yourLocation: {
      type: String,
      required: true,
    },
    class: {
      type: String,
    },
    subject: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

UserSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await User.findOne({ email }).select('+password')
  return existingUser
}

UserSchema.statics.isPasswordMatch = async function (
  password: string,
  hashPassword: string
) {
  return bcrypt.compare(password, hashPassword)
}

export const User = model<TUser, UserModel>('User', UserSchema)
