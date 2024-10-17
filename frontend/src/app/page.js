"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar, Mail, Phone, User, Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendOtp } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-primary text-white dark:text-black">
      <div className="flex items-center">
        <Image
          src="https://i.ibb.co/DM4bZFX/logoo.png"
          alt="Doctor Appointment Logo"
          width={100}
          height={100}
          className="mr-2 dark:bg-black p-1 rounded-sm"
        />
        <span className="text-xl font-bold">DocAppoint</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="text-white hover:text-primary-light"
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
}

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    dispatch(sendOtp(formData));

    router.push("verify-otp");
    localStorage.setItem("phoneNumber", formData.phoneNumber);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    toast({
      title: "Appointment Requested",
      description:
        "We've received your appointment request and will contact you soon.",
    });
    setFormData({ fullName: "", email: "", phoneNumber: "" });
    setIsSubmitting(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2">
                <motion.h1
                  className="text-3xl font-bold mb-6 text-primary dark:text-primary-light"
                  {...fadeInUp}
                >
                  Doctor Appointment Request
                </motion.h1>
                <motion.p
                  className="text-gray-600 dark:text-gray-400 mb-6"
                  {...fadeInUp}
                  transition={{ delay: 0.2 }}
                >
                  Fill out the form to request an appointment with one of our
                  experienced doctors. We're here to provide you with the best
                  medical care.
                </motion.p>
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.div
                    className="space-y-2"
                    {...fadeInUp}
                    transition={{ delay: 0.5 }}
                  >
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-primary dark:text-primary-light"
                    >
                      <User size={18} />
                      Full Name
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="border-primary dark:border-primary-light focus:ring-primary dark:focus:ring-primary-light"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    {...fadeInUp}
                    transition={{ delay: 0.6 }}
                  >
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-primary dark:text-primary-light"
                    >
                      <Mail size={18} />
                      Email
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-primary dark:border-primary-light focus:ring-primary dark:focus:ring-primary-light"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    {...fadeInUp}
                    transition={{ delay: 0.7 }}
                  >
                    <Label
                      htmlFor="phoneNumber"
                      className="flex items-center gap-2 text-primary dark:text-primary-light"
                    >
                      <Phone size={18} />
                      Mobile Number
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="123-456-7890"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="border-primary dark:border-primary-light focus:ring-primary dark:focus:ring-primary-light"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div {...fadeInUp} transition={{ delay: 0.8 }}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        className="w-full bg-accent  bg-green-300 hover:bg-accent-dark text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Calendar size={18} />
                            Scheduling...
                          </motion.div>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Calendar size={18} />
                            Request Appointment
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </div>
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Image
                  src="https://media.istockphoto.com/id/973278536/vector/hospital-building-flat-style-on-blue-sky.jpg?s=612x612&w=0&k=20&c=HUx8AYHajXbrLMCKsjJtw3lrPkuhu6EuqeoVCzEukVo="
                  alt="Doctor consultation"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {[
                {
                  title: "Expert Doctors",
                  description:
                    "Our team of experienced medical professionals is here to help you.",
                  img: "https://img.icons8.com/color/100/doctor-female-skin-type-3.png",
                },
                {
                  title: "Modern Facilities",
                  description:
                    "State-of-the-art equipment for accurate diagnosis and treatment.",
                  img: "https://img.icons8.com/fluency/48/medical-doctor.png",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Round-the-clock assistance for all your medical needs.",
                  img: "https://img.icons8.com/color/100/doctor-male-skin-type-3.png",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-primary-light dark:border-primary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 bg-primary-light rounded-full"
                  />
                  <h2 className="text-xl font-semibold mb-2 text-center text-primary dark:text-primary-light">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
