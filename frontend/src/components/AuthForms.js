import React, { useState } from 'react';
import styles from './AuthForms.module.css';

function AuthForms({ onRegister, onLogin }) {
  const [showRegister, setShowRegister] = useState(false); // New state to toggle views

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterUsernamePassword] = useState(''); // Corrected variable name
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister(registerUsername, registerEmail, registerPassword);
    setRegisterUsername('');
    setRegisterEmail('');
    setRegisterUsernamePassword(''); // Reset password field
    setShowRegister(false); // Go back to login after registration attempt
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
    setLoginEmail('');
    setLoginPassword('');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        {showRegister ? (
          // Register Form
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterUsernamePassword(e.target.value)} // Updated onChange
                required
              />
              <button type="submit" className={styles.authButton}>Register</button>
            </form>
            <p className={styles.toggleLink}>
              Already have an account?{' '}
              <span onClick={() => setShowRegister(false)}>Login here</span>
            </p>
          </>
        ) : (
          // Login Form
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit" className={styles.authButton}>Login</button>
            </form>
            <p className={styles.toggleLink}>
              New User?{' '}
              <span onClick={() => setShowRegister(true)}>Register here</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForms;