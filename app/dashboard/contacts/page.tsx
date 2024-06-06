"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../../../styles/ContactList.module.css";

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsList: ContactData[] = [];
      querySnapshot.forEach((doc) => {
        contactsList.push({ id: doc.id, ...doc.data() } as ContactData);
      });
      setContacts(contactsList);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.contacts}>
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>
                  {new Date(
                    contact.timestamp.seconds * 1000
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contacts;
