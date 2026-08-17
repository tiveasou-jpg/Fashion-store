import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (onLogin) {
        onLogin(userCredential.user);
      }

      alert("Logged in successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address above first.");
      return;
    }
    
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Make sure the email is valid.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      {message && <p style={{ color: 'green', fontSize: '14px' }}>{message}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        {/* 🔑 Forgot Password Button */}
        <div style={{ textAlign: 'right', marginTop: '-5px' }}>
          <button 
            type="button" 
            onClick={handleForgotPassword}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#ff6f61', 
              cursor: 'pointer', 
              fontSize: '13px',
              textDecoration: 'underline' 
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}