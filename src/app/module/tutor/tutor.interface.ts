import { Model, Types } from "mongoose"


export type TTutor = {
    id:string
    user: Types.ObjectId
    name: string
    email:string
    password: string
    phone:string
    bio: string
    age: number
    gender: 'male' | 'female' | 'other'
    profileImage?: string
    experience: number
    medium: string
    rating:{
        totalStudent:number,
        ratingValue:number
    }
    educationalBg: {
        level: string,
        institute: string,
        major: string
    }
    preferredClass: string[]
    preferredSubjects: string[]
    availability: "available" | "anavailable"
    tutionFee: number
}

export interface TutorModel extends Model<TTutor> {
  isUserExists(email: string): Promise<TTutor | null>
}
