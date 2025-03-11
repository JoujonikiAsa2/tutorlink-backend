export type TUser = {
    name: string
    email: string
    phone: string
    gender: 'male' | 'female' | 'other',
    password: string
    role: 'student' | 'tutor' | 'admin'
    profileImage?: string
  }
  