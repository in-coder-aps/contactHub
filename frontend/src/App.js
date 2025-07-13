import React, { useState, useEffect, useCallback } from 'react';
import AuthForms from './components/AuthForms';
import UserDetails from './components/UserDetails';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from './api';
import styles from './App.module.css';

function App() {
  // Initialize token from localStorage, or null if not found
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken') || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  // Effect to save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [token]);

  const fetchCurrentUser = useCallback(async () => {
    if (!token) {
      setCurrentUser(null);
      return;
    }
    try {
      const user = await getCurrentUser(token);
      setCurrentUser(user);
    } catch (err) {
      setError('Failed to fetch current user: ' + err.message);
      setToken(null); // Invalidate token if current user fetch fails
      setCurrentUser(null);
      localStorage.removeItem('jwtToken'); // Also clear from localStorage
    }
  }, [token]);

  const fetchContacts = useCallback(async () => {
    if (!token) {
      setContacts([]);
      return;
    }
    try {
      const contactsData = await getContacts(token);
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (err) {
      setError('Failed to fetch contacts: ' + err.message);
    }
  }, [token]);

  // Existing useEffects remain for initial fetches based on token
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleRegister = async (username, email, password) => {
    setError('');
    try {
      await registerUser(username, email, password);
      alert('Registration successful! Please log in.');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  const handleLogin = async (email, password) => {
    setError('');
    try {
      const data = await loginUser(email, password);
      setToken(data.accessToken); // This will trigger the useEffect to save to localStorage
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleLogout = () => {
    setToken(null); // This will trigger the useEffect to remove from localStorage
    setCurrentUser(null);
    setContacts([]);
    setError('');
    setEditingContact(null);
  };

  const handleAddContact = async (name, email, phone) => {
    setError('');
    try {
      await createContact(token, { name, email, phone });
      await fetchContacts();
    } catch (err) {
      setError('Failed to add contact: ' + err.message);
    }
  };

  const handleEditContact = (contact) => {
    setError('');
    setEditingContact(contact);
  };

  const handleUpdateContact = async (id, name, email, phone) => {
    setError('');
    try {
      await updateContact(token, id, { name, email, phone });
      setEditingContact(null);
      await fetchContacts();
    } catch (err) {
      setError('Failed to update contact: ' + err.message);
    }
  };

  const handleDeleteContact = async (id) => {
    setError('');
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(token, id);
        await fetchContacts();
      } catch (err) {
        setError('Failed to delete contact: ' + err.message);
      }
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>ContactHub</h1>
      {error && <p className={styles.errorMessage}>Error: {error}</p>}

      {!token ? (
        <>
          <AuthForms onRegister={handleRegister} onLogin={handleLogin} />
        </>
      ) : (
        <>
          <UserDetails user={currentUser} onLogout={handleLogout} />
          <hr className={styles.sectionDivider} />
          <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
          <ContactForm
            onSubmit={editingContact ? handleUpdateContact : handleAddContact}
            initialData={editingContact}
            buttonText={editingContact ? 'Update Contact' : 'Add Contact'}
          />
          <hr className={styles.sectionDivider} />
          <h2>Your Contacts</h2>
          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
}

export default App;