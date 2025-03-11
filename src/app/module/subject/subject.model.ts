import mongoose, { model } from "mongoose";
import { TSubject } from "./subject.interface";

const SubjectSchema = new mongoose.Schema<TSubject>({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gradeLevel: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  });

  export const Subject = model<TSubject>('Subject', SubjectSchema);