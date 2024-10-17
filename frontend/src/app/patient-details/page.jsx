"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { patientDetails } from "@/store/detailSlice";

export default function PatientDetails() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      dob: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      occupation: "",
      gender: "",
      primaryCarePhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedications: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      consentTreatment: false,
      consentUseDisclosure: false,
      acknowledgePolicy: false,
    },
  });
  const dispatch = useDispatch();

  function onSubmit(formData) {
    console.log("Form Data Submitted:", formData);
    dispatch(patientDetails(formData));

    // Navigate to the appointment page after successful submission
    router.push("/book-appiontment");
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome👋</CardTitle>
          <CardDescription>Let us know about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Patient Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form fields here... */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Adam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Add other fields similarly... */}
                </div>
              </div>

              {/* Additional form sections... */}

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
