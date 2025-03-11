export interface IBooking {
  studentId: string
  tutorId: string
  date: Date
  duration: number
  price: number
  status: 'pending' | 'completed' | 'canceled'
}
