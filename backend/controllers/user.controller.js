// In backend/controllers/user.controller.js

import otpGenerator from "otp-generator";
import twilio from "twilio";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// console.log("Account SID:", accountSid); // For debugging, this should print the SID
// console.log("Auth Token:", authToken); // For debugging, this should print the token
// console.log("Phone Number:", twilioPhoneNumber);
const client = twilio(accountSid, authToken);

// Send OTP function
export const sendOtp = async (req, res) => {
  const { phoneNumber, email, fullname } = req.body;

  // Check if the phoneNumber is provided and is a valid string
  if (
    !phoneNumber ||
    typeof phoneNumber !== "string" ||
    phoneNumber.trim() === ""
  ) {
    return res
      .status(400)
      .send({ message: "A valid phone number is required." });
  }

  try {
    // Look for the user by phone number
    let user = await User.findOne({ phoneNumber });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({
        phoneNumber,
        fullname,
        email,
      });
      await user.save(); // Save the new user
    }

    // Generate OTP
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Update user with OTP and expiration
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via Twilio
    try {
      await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError); // Log Twilio error
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: twilioError.message });
    }

    res.status(200).json({ message: "OTP sent successfully", data: otp });
  } catch (error) {
    console.error("Error occurred while sending OTP:", error); // Log the error for debugging
    res
      .status(500)
      .send({ message: "Error sending OTP", error: error.message || error });
  }
};

// Verify OTP function
export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Validate input
  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Phone number and OTP are required" });
  }

  try {
    const user = await User.findOne({ phoneNumber });

    // Check if user exists and OTP has not expired
    if (!user || !user.otp || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired or is invalid" });
    }

    // Verify the OTP
    if (user.otp === otp) {
      // Clear OTP fields
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      // Generate JWT token
      // const token = jwt.sign(
      //   { phoneNumber: user.phoneNumber },
      //   "your_secret_key",
      //   { expiresIn: "1h" }
      // );

      // Send response with the token
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};
