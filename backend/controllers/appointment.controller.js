import { User } from "../models/user.model.js";
import { Appointment } from "../models/patient-appointment.model.js";
export const appointment = async (req, res) => {
  const {
    phoneNumber,
    doctor,
    reasonForAppointment,
    additionalComment,
    appointmentDate,
  } = req.body;
  try {
    if (
      !doctor ||
      !reasonForAppointment ||
      !additionalComment ||
      !appointmentDate
    ) {
      res.json({
        msg: "all feilds are required",
      });
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    const appiontmentDetail = new Appointment({
      phoneNumber,
      doctor,
      reasonForAppointment,
      additionalComment,
      appointmentDate,
    });
    user.appointment = appiontmentDetail;
    const data = await user.save();

    res.status(200).send({
      success: true,
      msg: "your appointment is booked wait until confirmation",
      data,
    });
  } catch (error) {
    console.error("Error saving patient details:", error);
    res.status(400).json({
      success: false,
      msg: "Unable to add details",
      error: error.message || error,
    });
  }
};
