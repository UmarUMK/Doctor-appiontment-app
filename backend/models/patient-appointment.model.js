import mongoose from "mongoose";

export const appointmentScheam = new mongoose.Schema(
  {
    // patientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    doctor: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    reasonForAppointment: {
      type: String,
      required: true,
    },
    additionalComment: {
      type: String,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appiontment", appointmentScheam);
