"use client";
import React, { useState } from "react";
import styles from "../../styles/Contact.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can add your logic to handle form submission, e.g., send an email or integrate with a backend API
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div className={styles.contact}>
        <h1>Contact Me</h1>
        {submitted ? (
          <div className={styles.successMessage}>
            Thank you for your message! I will get back to you as soon as
            possible.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
