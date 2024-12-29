import React, { useState } from 'react';
import '../styles/ContactUs.css';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send the message.');
      }

      setSubmitted(true);
      setName(''); // Reset the form fields
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error:', err.message);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Merci pour votre message !</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nom:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send the Message</button>
        </form>
      )}
    </div>
  );
}

export default ContactUs;