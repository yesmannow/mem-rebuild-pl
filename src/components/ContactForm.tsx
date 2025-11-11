import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { trackCTA } from '@/utils/analytics';
import './ContactForm.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!web3formsKey) {
        alert('Form submission is not configured. Please contact me directly.');
        return;
      }

      // Using Web3Forms - replace with your preferred service
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          ...data,
          subject: 'Contact Form Submission',
        }),
      });

      const result = await response.json();

      if (result.success) {
        trackCTA('contact_form_submit', 'contact');
        reset();
        alert('Thank you! Your message has been sent.');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-form-header">
        <Mail className="contact-form-icon" size={32} />
        <h2 className="section-heading">Get in Touch</h2>
        <p className="section-subheading">
          Have a project in mind? Let's discuss how we can work together.
        </p>
      </div>

      <div className="contact-form-fields">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="form-error" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="form-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            className={`form-input form-textarea ${errors.message ? 'form-input-error' : ''}`}
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className="form-error" role="alert">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        className="btn-primary contact-form-submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send size={18} />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
