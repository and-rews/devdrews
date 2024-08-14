"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MessageSquare, User, ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 bg-matrix overflow-hidden">
      <h1
        className="text-4xl md:text-6xl font-bold mb-12 text-glow"
        data-aos="fade-up"
      >
        Contact <span className="text-primary">Me</span>
      </h1>

      <div className="w-full max-w-md" data-aos="fade-up" data-aos-delay="100">
        {submitted ? (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8"
            role="alert"
          >
            <p className="font-bold">Thank you for your message!</p>
            <p className="text-sm">
              I will get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 text-white bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 text-white bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-full px-4 py-2 text-white bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 text-white bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <MessageSquare
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              Send Message <ArrowRight className="ml-2" size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
