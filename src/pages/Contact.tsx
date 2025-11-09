import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MessageSquare,
  User,
  Building2,
  Phone,
  FileText,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { trackCTA, trackPortfolioEngagement } from '../utils/analytics';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
  reason: string;
  company?: string;
  phone?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  reason?: string;
}

const CONTACT_REASONS = [
  { value: 'job-opportunity', label: 'Job Opportunity', description: 'Interested in hiring me' },
  { value: 'collaboration', label: 'Collaboration', description: 'Want to work together' },
  { value: 'consulting', label: 'Consulting Inquiry', description: 'Need marketing expertise' },
  { value: 'interview', label: 'Interview Request', description: 'Would like to interview' },
  { value: 'question', label: 'General Question', description: 'Have a question' },
  { value: 'other', label: 'Other', description: 'Something else' },
];

const STRATEGY_CALL_URL = 'https://cal.com/jacob-darling';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    reason: '',
    company: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form interactions on mount
  useEffect(() => {
    trackPortfolioEngagement.contactFormStart();
  }, []);

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'reason':
        if (!value) return 'Please select a reason';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = (): boolean => {
    return (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.reason &&
      !formErrors.message &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.reason !== '' &&
      formData.message.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    const requiredFields = ['name', 'email', 'reason', 'message'];
    const newTouchedFields = new Set([...touchedFields, ...requiredFields]);
    setTouchedFields(newTouchedFields);

    // Validate all fields
    const errors: FormErrors = {};
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData] || '');
      if (error) errors[field as keyof FormErrors] = error;
    });
    setFormErrors(errors);

    if (Object.keys(errors).length > 0 || !isFormValid()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!web3formsKey) {
        setError(
          'Form submission is not configured. Please contact me directly at jacob@jacobdarling.com'
        );
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reason: formData.reason,
          company: formData.company,
          phone: formData.phone,
          subject: `Portfolio Contact: ${formData.reason || 'General Inquiry'}`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', reason: '', company: '', phone: '' });
        setFormErrors({});
        setTouchedFields(new Set());
        trackPortfolioEngagement.contactFormSubmit(formData.reason || 'general');
      } else {
        setError(result.message || 'Failed to send message. Please try again.');
        trackPortfolioEngagement.contactFormError(result.message || 'Unknown error');
      }
    } catch (err) {
      setError('An error occurred. Please try emailing directly at jacob@jacobdarling.com');
      trackPortfolioEngagement.contactFormError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStrategyCallClick = useCallback(() => {
    trackCTA('book_call', 'contact_info');
    if (typeof window !== 'undefined') {
      window.open(STRATEGY_CALL_URL, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <main className="contact-page">
      <SectionWrapper bg="bg-white" animate={true}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div className="contact-header" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Let's Create What Doesn't Exist Yet.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm currently open to new opportunities in marketing leadership and tech integration.
              Feel free to reach out for interviews, collaborations, or any questions—I'd love to connect!
              <br />
              <br />
              Have a challenge that needs solving? A system that needs building? An idea that needs shaping?
              <br />
              <br />
              <span className="font-semibold text-gray-900">Let's talk.</span>
            </p>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper bg="bg-gray-50" animate={true}>
        <div className="contact-content">
          <div className="contact-grid">
            {/* Contact Form Card */}
            <motion.div
              className="form-card"
              variants={staggerItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="success-card"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="success-icon-wrapper"
                    >
                      <CheckCircle2 size={48} className="text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
                    <p className="text-gray-600 mb-6">I'll be in touch within 24 hours.</p>
                    <motion.button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', message: '', reason: '', company: '', phone: '' });
                        setFormErrors({});
                        setTouchedFields(new Set());
                      }}
                      className="btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >
                    {/* Name Field */}
                    <div className="form-group-floating">
                      <div className="input-wrapper">
                        <User size={20} className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          required
                          className={formErrors.name ? 'error' : ''}
                          aria-label="Your name"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'name-error' : undefined}
                        />
                        <label htmlFor="name" className={formData.name ? 'floating' : ''}>
                          Name <span className="required">*</span>
                        </label>
                      </div>
                      {formErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text"
                          id="name-error"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          {formErrors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group-floating">
                      <div className="input-wrapper">
                        <Mail size={20} className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          required
                          className={formErrors.email ? 'error' : ''}
                          aria-label="Your email address"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        <label htmlFor="email" className={formData.email ? 'floating' : ''}>
                          Email <span className="required">*</span>
                        </label>
                      </div>
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text"
                          id="email-error"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Reason Field */}
                    <div className="form-group-floating">
                      <div className="select-wrapper">
                        <MessageSquare size={20} className="input-icon" />
                        <select
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={formErrors.reason ? 'error' : ''}
                          aria-label="Reason for contact"
                          aria-invalid={!!formErrors.reason}
                          aria-describedby={formErrors.reason ? 'reason-error' : undefined}
                        >
                          <option value="">Select a reason...</option>
                          {CONTACT_REASONS.map(reason => (
                            <option key={reason.value} value={reason.value}>
                              {reason.label} - {reason.description}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="reason" className={formData.reason ? 'floating-select' : ''}>
                          Reason for Contact <span className="required">*</span>
                        </label>
                      </div>
                      {formErrors.reason && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text"
                          id="reason-error"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          {formErrors.reason}
                        </motion.p>
                      )}
                    </div>

                    {/* Company Field */}
                    <div className="form-group-floating">
                      <div className="input-wrapper">
                        <Building2 size={20} className="input-icon" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          aria-label="Your company or organization"
                        />
                        <label htmlFor="company" className={formData.company ? 'floating' : ''}>
                          Company/Organization
                        </label>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="form-group-floating">
                      <div className="input-wrapper">
                        <Phone size={20} className="input-icon" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          aria-label="Your phone number"
                        />
                        <label htmlFor="phone" className={formData.phone ? 'floating' : ''}>
                          Phone
                        </label>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="form-group-floating">
                      <div className="textarea-wrapper">
                        <FileText size={20} className="input-icon" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          rows={6}
                          required
                          className={formErrors.message ? 'error' : ''}
                          aria-label="Your message"
                          aria-invalid={!!formErrors.message}
                          aria-describedby={formErrors.message ? 'message-error' : undefined}
                        />
                        <label htmlFor="message" className={formData.message ? 'floating-textarea' : ''}>
                          Message <span className="required">*</span>
                        </label>
                      </div>
                      {formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text"
                          id="message-error"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          {formErrors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="error-card"
                          role="alert"
                        >
                          <AlertCircle size={20} />
                          <div>
                            <strong>Error sending message</strong>
                            <p>{error}</p>
                            <a
                              href="mailto:jacob@jacobdarling.com"
                              className="error-link"
                              aria-label="Send email directly to jacob@jacobdarling.com"
                            >
                              Email directly instead →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting || !isFormValid()}
                      whileHover={!isSubmitting && isFormValid() ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting && isFormValid() ? { scale: 0.98 } : {}}
                      aria-label="Submit contact form"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="info-column">
              {/* Get In Touch Card */}
              <motion.div
                className="info-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">Get In Touch</h3>
                <p className="text-gray-600 mb-6">Prefer to reach out directly? Use any of these options:</p>

                {/* Strategy Call CTA Card */}
                <motion.div
                  className="strategy-call-card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CalendarDays size={32} className="text-[#10b981]" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Book a Strategy Call</h4>
                    <p className="text-sm text-gray-600">
                      Map out your next growth move in a focused 30-minute session.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleStrategyCallClick}
                    className="strategy-call-btn"
                    aria-label="Book a strategy call on Cal.com"
                  >
                    Schedule Now
                  </motion.button>
                </motion.div>

                {/* Contact Methods */}
                <div className="contact-methods">
                  <motion.a
                    href="mailto:jacob@jacobdarling.com"
                    className="contact-method"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Send email to jacob@jacobdarling.com"
                  >
                    <div className="contact-icon">
                      <Mail size={24} />
                    </div>
                    <div>
                      <strong>Email</strong>
                      <p>jacob@jacobdarling.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/jacobdarling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Connect on LinkedIn"
                  >
                    <div className="contact-icon">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <strong>LinkedIn</strong>
                      <p>Connect professionally</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/JdarlingGT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="View GitHub profile"
                  >
                    <div className="contact-icon">
                      <Github size={24} />
                    </div>
                    <div>
                      <strong>GitHub</strong>
                      <p>View my code</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Quote Card */}
              <motion.div
                className="quote-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <blockquote className="text-lg italic text-gray-700">
                  "Systems create freedom — let's design one that works for you."
                </blockquote>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                className="cta-card"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">Want to see my work?</h3>
                <p className="text-gray-600 mb-4">
                  Explore my case studies to see how I solve real business challenges.
                </p>
                <Link
                  to="/case-studies"
                  className="btn-secondary"
                  aria-label="View case studies"
                >
                  View Case Studies →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
};

export default Contact;
