import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import { trackCTA } from '../../utils/analytics';
import './NewsletterForm.css';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!web3formsKey) {
        setError('Newsletter subscription is not configured. Please try again later.');
        setIsSubmitting(false);
        return;
      }

      // Using Web3Forms - replace with your newsletter service
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          email: email,
          subject: 'Newsletter Subscription',
          from_name: 'Portfolio Newsletter',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setEmail('');
        trackCTA('newsletter_signup', 'footer');
      } else {
        setError('Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="newsletter-form newsletter-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Check className="success-icon" size={32} />
        <h3>Thanks for subscribing!</h3>
        <p>You'll receive updates about new case studies, insights, and tools.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="newsletter-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="newsletter-header">
        <Mail className="newsletter-icon" size={24} />
        <div>
          <h3>Stay Updated</h3>
          <p>Get insights on marketing systems, automation, and growth strategies</p>
        </div>
      </div>

      <div className="newsletter-input-group">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <motion.button
          type="submit"
          className="btn-primary newsletter-submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={18} />
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </div>

      {error && <div className="newsletter-error">{error}</div>}

      <p className="newsletter-privacy">We respect your privacy. Unsubscribe at any time.</p>
    </motion.form>
  );
};

export default NewsletterForm;
