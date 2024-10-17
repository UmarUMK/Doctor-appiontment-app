"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { appiontmentDetails } from "@/store/detailSlice.js"; // Corrected spelling
import { useEffect, useState } from "react";

export default function AppointmentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false); // New state

  const onSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
    dispatch(appiontmentDetails(formData)); // Corrected spelling
    setIsSubmitted(true); // Set the submission state
  };

  useEffect(() => {
    if (isSubmitted) {
      router.push("/appointment-success"); // Corrected spelling
    }
  }, [isSubmitted, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <img
              src="https://i.ibb.co/DM4bZFX/logoo.png"
              alt="Logo"
              className="w-16 h-16"
            />
            <div>
              <CardTitle className="text-3xl font-bold">Hey there</CardTitle>
              <p className="text-muted-foreground">
                Request a new appointment in 10 seconds
              </p>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select onValueChange={(value) => setValue("doctor", value)}>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-umar">Dr Umar</SelectItem>
                  <SelectItem value="dr-sohil">Dr Sohil</SelectItem>
                  <SelectItem value="dr-shoaib">Dr Shoaib</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reasonForAppointment">
                  Reason for appointment
                </Label>
                <Textarea
                  id="reasonForAppointment"
                  {...register("reasonForAppointment", { required: true })}
                  className="h-32"
                />
                {errors.reasonForAppointment && (
                  <span>This field is required</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalComment">
                  Additional comments/notes
                </Label>
                <Textarea
                  id="additionalComment"
                  {...register("additionalComment")}
                  className="h-32"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Expected appointment date</Label>
              <div className="relative">
                <Input
                  id="appointmentDate"
                  type="date"
                  {...register("appointmentDate", { required: true })}
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.appointmentDate && <span>This field is required</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Book an appointment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
