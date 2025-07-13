import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.css'; // Import the CSS Module

function ContactForm({ onSubmit, initialData = null, buttonText }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onSubmit(initialData._id, name, email, phone); // Pass ID for updates
    } else {
      onSubmit(name, email, phone);
    }
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit" className={styles.submitButton}>{buttonText}</button>
    </form>
  );
}

export default ContactForm;