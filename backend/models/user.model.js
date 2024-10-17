import mongoose, { Schema } from "mongoose";
import { patientSchema } from "./patient.model.js";
import { appointmentScheam } from "./patient-appointment.model.js";
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    otpExpires: {
      type: Date, // No 'required' constraint here either
    },
    patient: patientSchema,
    appointment: appointmentScheam,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
