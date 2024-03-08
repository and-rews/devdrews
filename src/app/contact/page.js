"use client";

import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import Particles from "../../../components/Particles";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

async function addDataToFirestore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

export default function About() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFirestore(name, email, message);

    if (added) {
      setName("");
      setEmail("");
      setMessage("");

      alert("Message submitted successfully!");
    }
  };

  const socials = [
    {
      name: "Github",
      link: "https://github.com/and-rews",
      image: "/gitlogo.png",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/andrews-osei/",
      image: "/linkedin.jpg",
    },
    {
      name: "X",
      link: "https://twitter.com/devdrews1",
      image: "/xl.avif  ",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/devdrews1",
      image: "/fb.jpg",
    },
  ];

  return (
    <main>
      {/* <Particles /> */}
      <div className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
        <Navbar />
        <div className="sabout">
          <div className="sleft projects flex flex-wrap justify-center p-12">
            {socials.map((social) => (
              <article
                key={social.name}
                className="project-card w-full md:w-1/4 p-4 rounded"
              >
                <Link href={social.link}>
                  <Image
                    src={social.image}
                    alt={social.name}
                    height={100}
                    width={100}
                    className="socimg"
                  />
                </Link>
                <div className="project-info p-4">
                  <h3 className="text-xl font-bold mb-2">{social.name}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="right">
            <div className="fm">
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-4  shadow-md rounded-xl form"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-white font-bold mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:border-green-600 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white font-bold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:border-green-600 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-white font-bold mb-2"
                  >
                    Message:
                  </label>
                  <textarea
                    rows={500}
                    id="message"
                    className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:border-green-600 text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
