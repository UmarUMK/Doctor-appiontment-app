import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AppointmentSuccess() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <header className="text-center">
          <Image
            src="https://i.ibb.co/DM4bZFX/logoo.png"
            alt="Company Logo"
            width={112}
            height={112}
            className="mx-auto"
          />
        </header>

        <section className="text-center space-y-4 animate-fade-in">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold sm:text-4xl">
            <span className="text-green-500">Your Appointment request</span> has
            been
            <br className="hidden sm:inline" /> successfully submitted
          </h1>
          <p className="text-gray-300">
            We will be in touch shortly to confirm
          </p>
        </section>

        <section className="border-t-2 border-b-2 border-gray-700 p-4 text-center animate-fade-in-up">
          <h2 className="font-semibold">Requested Appointment Details:</h2>
          <p>Dr. John - June 23, 1994 - 5:00 PM</p>
        </section>

        <footer className="text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 mt-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Return to Home
          </a>
        </footer>
      </div>
    </main>
  );
}
