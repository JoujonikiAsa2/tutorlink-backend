import mongoose, { model } from "mongoose"
import { IBooking } from "./booking.interface"

export const BookingSchema = new mongoose.Schema<IBooking>(
    {
      studentId: {
        type: String,
        required: true,
        ref: 'User',
      },
      tutorId: {
        type: String,
        required: true,
        ref: 'User',
      },
      date: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
      },
    },
    {
      timestamps: true,
    }
  )
  
  export const Booking = model<IBooking>('Booking', BookingSchema)
  