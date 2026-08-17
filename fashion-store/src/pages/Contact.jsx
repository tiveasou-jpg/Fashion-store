import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure your firebase.js file is in src/
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // Update form values as user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add data to Firestore under 'contact_messages'
      await addDoc(collection(db, 'contact_messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp()
      });

      alert("Thank you! Your message has been sent successfully.");
      
      // Clear inputs
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error saving message to Firebase: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Side: Form */}
          <div className="contact-form">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Send us a message anytime.</p>

            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
              <textarea 
                name="message"
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="social-icons">
              <a href="#dress" title="Dress">👗</a>
              <a href="#skirt" title="Skirt">🩳</a>
              <a href="#shoes" title="Shoes">👠</a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="contact-image">
            <img 
              src="https://i.pinimg.com/736x/e2/e2/dd/e2e2dd9bdb7a225734059c3c76727eb1.jpg" 
              alt="Fashion Contact" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}