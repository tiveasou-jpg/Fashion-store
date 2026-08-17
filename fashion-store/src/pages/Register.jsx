import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Failed to create account. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up to start shopping with us.</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "CREATING ACCOUNT..." : "REGISTER"}
          </button>
        </form>

        <p style={styles.signupText}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px' },
  card: { backgroundColor: '#fff0ee', padding: '35px 30px', borderRadius: '20px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#333' },
  subtitle: { color: '#666', marginBottom: '20px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { width: '100%', padding: '14px 18px', borderRadius: '25px', border: '1px solid #ffded8', outline: 'none', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '25px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  error: { color: '#e74c3c', fontSize: '14px', marginBottom: '10px' },
  signupText: { marginTop: '20px', fontSize: '14px', color: '#555' },
  link: { color: '#ff6f61', fontWeight: 'bold', textDecoration: 'none' }
};