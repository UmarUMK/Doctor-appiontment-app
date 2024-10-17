import mongoose from "mongoose";

export const patientSchema = new mongoose.Schema(
  {
    // Personal Information Section
    fullname: {
      type: String,
      required: true,
    },
    consentTreatment: {
      type: Boolean,
      required: true,
    },
    consentUseDisclosure: {
      type: Boolean,
      required: true,
    },
    acknowledgePolicy: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },

    emergencyContactPhone: {
      type: String,
      required: true,
    },

    // Medical Information Section
    primaryCarePhysician: {
      type: String,
    },
    insuranceProvider: {
      type: String,
    },
    insurancePolicyNumber: {
      type: String,
    },
    allergies: {
      type: String,
    },
    pastMedicalHistory: {
      type: String,
    },

    // Identity Information Section
    identificationType: {
      type: String,
      required: true,
    },
    identificationNumber: {
      type: String,
      required: true,
    },
    identityImage: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference the PatientDetail schema
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
