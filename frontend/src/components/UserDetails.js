import React from 'react';
import styles from './UserDetails.module.css'; // Import the CSS Module

function UserDetails({ user, onLogout }) {
  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className={styles.userDetails}>
      <div>
        <h3>Welcome, {user.username}! 👋</h3>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}

export default UserDetails;