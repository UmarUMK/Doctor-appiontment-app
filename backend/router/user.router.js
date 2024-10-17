import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/user.controller.js";
import { patientDetails } from "../controllers/patient-details.controller.js";
import { appointment } from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middlewares/jwt.js";
const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/patient-details", patientDetails);
router.post("/appiontment", appointment);
export default router;
