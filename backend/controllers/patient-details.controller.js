import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";

export const patientDetails = async (req, res) => {
  const {
    fullname,
    email,
    phoneNumber,
    dob,
    gender,
    address,
    occupation,
    emergencyContactName,
    
emergencyContactPhone,
    primaryCarePhysician,
    insuranceProvider,
    insurancePolicyNumber,
    allergies,
    pastMedicalHistory,
    identificationType,
    identificationNumber,
    identityImage = "nope", // Default value for identityImage
    acknowledgePolicy,
    consentUseDisclosure,
    consentTreatment,
  } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // Define required fields
    const requiredFields = {
      fullname,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      occupation,
      emergencyContactName,
      
emergencyContactPhone,
      primaryCarePhysician,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      pastMedicalHistory,
      identificationType,
      identificationNumber,
      consentTreatment, // You can add other consents if required
    };

    // Check for missing fields
    const missingFields = Object.entries(requiredFields).filter(
      ([key, value]) => !value
    );

    // If there are any missing fields, return a specific error message
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(([key]) => key).join(", ");
      return res.status(400).json({
        msg: `The following fields are required: ${missingFieldNames}`,
        success: false,
      });
    }

    // Create a new PatientDetail instance
    const patientDetails = new Patient({
      fullname,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      occupation,
      emergencyContactName,
      
emergencyContactPhone,
      primaryCarePhysician,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      pastMedicalHistory,
      identificationType,
      identificationNumber,
      identityImage,
      acknowledgePolicy,
      consentUseDisclosure,
      consentTreatment,
    });

    // Assign the patient details to the user
    user.patient = patientDetails;

    // Save user with updated patient details
    await user.save();

    return res.status(200).json({
      msg: "Patient details added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error saving patient details:", error);
    return res.status(400).json({
      success: false,
      msg: "Unable to add details",
      error: error.message || error,
    });
  }
};
