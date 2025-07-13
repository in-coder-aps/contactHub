import React from 'react';
import styles from './ContactList.module.css'; // Import the CSS Module

function ContactList({ contacts, onEdit, onDelete }) {
  if (!contacts || contacts.length === 0) {
    return <p className={styles.noContactsMessage}>No contacts added yet. Add your first contact above! 📝</p>;
  }

  return (
    <ul className={styles.contactList}>
      {contacts.map((contact) => (
        <li key={contact._id} className={styles.contactItem}>
          <div className={styles.contactInfo}>
            <strong>{contact.name}</strong> <br />
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={() => onEdit(contact)} className={styles.editButton}>Edit</button>
            <button onClick={() => onDelete(contact._id)} className={styles.deleteButton}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;