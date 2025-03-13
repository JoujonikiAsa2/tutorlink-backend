import { Model, Types } from 'mongoose'

export type TTutor = {
  id: string
  user: Types.ObjectId
  name: string
  email: string
  password: string
  phone: string
  bio?: string
  age: number
  gender: 'male' | 'female' | 'other'
   profileImage?: string
  experience?: number
  medium?: string
  rating?: {
    totalStudent: number
    ratingValue: number
  }
  yourLocation: string
  secondaryEducation?: {
    group: string
    institute: string
    passingYear: string
    result: string
  }
  higherEducation?: {
    group: string
    institute: string
    passingYear: string
    result: string
  }
  graduation?: {
    studyType: string
    institute: string
    department: string
    passingYear: string
    result: string
  }
  classes?: string[]
  subjects?: string[]
  availability: 'available' | 'anavailable'
  preferedLocation?: string[]
  hourlyRate?: number
}

export interface TutorModel extends Model<TTutor> {
  isUserExists(email: string): Promise<TTutor | null>
}
