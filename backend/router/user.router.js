import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/user.controller.js";
import { patientDetails } from "../controllers/patient-details.controller.js";
import { appointment } from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middlewares/jwt.js";

const router = Router();
function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'your-frontend-url'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Add methods as needed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add any other headers you need
    next(); // Call the next middleware or route handler
}

router.post("/send-otp",corsMiddleware, sendOtp);
router.post("/verify-otp",corsMiddleware, verifyOtp);
router.post("/patient-details",corsMiddleware, patientDetails);
router.post("/appiontment",corsMiddleware, appointment);
export default router;
