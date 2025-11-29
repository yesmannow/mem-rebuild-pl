import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Clock,
  Star,
  Coffee,
} from 'lucide-react';
import { trackPortfolioEngagement } from '../utils/analytics';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import TerminalBlock from '../components/ui/TerminalBlock';
import TechProfile from '../components/TechProfile';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { AvailabilityBadge } from '../components/ui/AvailabilityBadge';
import './Contact.css';

const FloatingParticles = React.lazy(() => import('../components/ui/FloatingParticles'));

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
      case 'email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      }
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
          'Form submission is not configured. Please contact me directly at hoosierdarling@gmail.com'
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
      setError('An error occurred. Please try emailing directly at hoosierdarling@gmail.com');
      trackPortfolioEngagement.contactFormError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <main className="contact-page relative z-10 w-full min-h-screen flex flex-col">
        {/* Floating Particles */}
        <Suspense fallback={<div className="h-16" />}>
          <FloatingParticles count={32} />
        </Suspense>

        {/* Hero Section with Bio Photo */}
        <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            {/* Profile and Intro Grid */}
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center mb-10">
              {/* Bio Photo */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center"
              >
                <TechProfile size="lg" className="mb-4" />
                <AvailabilityBadge 
                  available={true} 
                  text="Open to Opportunities" 
                  size="md" 
                />
              </motion.div>
              
              {/* Intro Text */}
              <motion.div variants={fadeInUp} className="text-center md:text-left">
                <p className="text-sm font-mono uppercase tracking-[0.35em] text-brand-muted mb-4">
                  Get in Touch
                </p>
                <p className="text-lg md:text-xl text-brand-muted leading-relaxed mb-4">
                  Available for marketing leadership roles, strategic consulting, and technology integration projects.
                  I respond to all inquiries within 24 hours.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-xs text-brand-teal font-medium">
                    Leadership Roles
                  </span>
                  <span className="px-3 py-1 bg-ocean-tangerine-dream/20 border border-ocean-tangerine-dream/30 rounded-full text-xs text-ocean-tangerine-dream font-medium">
                    Consulting
                  </span>
                  <span className="px-3 py-1 bg-ocean-pearl-aqua/20 border border-ocean-pearl-aqua/30 rounded-full text-xs text-ocean-pearl-aqua font-medium">
                    Inquiries
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur p-4 text-center">
                <OceanCountingNumber 
                  number={15} 
                  suffix="+" 
                  inView 
                  className="text-3xl md:text-4xl text-brand-teal block mb-1" 
                />
                <span className="text-xs md:text-sm text-brand-muted">Years Experience</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur p-4 text-center">
                <OceanCountingNumber 
                  number={72} 
                  suffix="+" 
                  inView 
                  className="text-3xl md:text-4xl text-ocean-tangerine-dream block mb-1" 
                />
                <span className="text-xs md:text-sm text-brand-muted">Projects Delivered</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur p-4 text-center">
                <OceanCountingNumber 
                  number={24} 
                  inView 
                  className="text-3xl md:text-4xl text-ocean-pearl-aqua block mb-1" 
                />
                <span className="text-xs md:text-sm text-brand-muted">Hour Response</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur p-4 text-center">
                <OceanCountingNumber 
                  number={100} 
                  suffix="%" 
                  inView 
                  className="text-3xl md:text-4xl text-green-400 block mb-1" 
                />
                <span className="text-xs md:text-sm text-brand-muted">Client Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 flex-1">
          <div className="contact-content max-w-6xl mx-auto">
            <div className="contact-grid">
            {/* Contact Form Card */}
            <motion.div
              className="form-card rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 md:p-8"
              variants={staggerItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-brand-teal/15 text-brand-teal">
                  <Send size={20} />
                </div>
                <h2 className="text-2xl font-bold text-brand-text">Send a Message</h2>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="success-card text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 mx-auto mb-6 bg-brand-teal/20 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 size={48} className="text-brand-teal" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-brand-text mb-2">Message Received!</h3>
                    <p className="text-brand-muted mb-6">I'll be in touch within 24 hours.</p>
                    <OceanRippleButton
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', message: '', reason: '', company: '', phone: '' });
                        setFormErrors({});
                        setTouchedFields(new Set());
                      }}
                      variant="outline"
                      size="md"
                    >
                      Send Another Message
                    </OceanRippleButton>
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
                          {...(formErrors.name && { 'aria-invalid': 'true' })}
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
                          {...(formErrors.email && { 'aria-invalid': 'true' })}
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
                          {...(formErrors.reason && { 'aria-invalid': 'true' })}
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
                          {...(formErrors.message && { 'aria-invalid': 'true' })}
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
                              href="mailto:hoosierdarling@gmail.com"
                              className="error-link"
                              aria-label="Send email directly to hoosierdarling@gmail.com"
                            >
                              Email directly instead →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <OceanRippleButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting || !isFormValid()}
                      className="btn-primary w-full"
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
                    </OceanRippleButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="info-column">
              {/* Get In Touch Card */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 hover:border-brand-teal/40 transition-all duration-300"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-brand-text">Get In Touch</h3>
                <p className="text-brand-muted mb-6">Prefer to reach out directly? Use any of these options:</p>

                {/* Contact Methods */}
                <div className="space-y-3">
                  <motion.a
                    href="mailto:hoosierdarling@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-brand-teal/40 transition-all group"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Send email to hoosierdarling@gmail.com"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/15 rounded-xl text-brand-teal group-hover:bg-brand-teal group-hover:text-slate-900 transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <strong className="text-brand-text block">Email</strong>
                      <p className="text-brand-muted text-sm">hoosierdarling@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/jacobdarling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-brand-teal/40 transition-all group"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Connect on LinkedIn"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/15 rounded-xl text-brand-teal group-hover:bg-brand-teal group-hover:text-slate-900 transition-all">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <strong className="text-brand-text block">LinkedIn</strong>
                      <p className="text-brand-muted text-sm">Connect professionally</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/JdarlingGT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-brand-teal/40 transition-all group"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    aria-label="View GitHub profile"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/15 rounded-xl text-brand-teal group-hover:bg-brand-teal group-hover:text-slate-900 transition-all">
                      <Github size={24} />
                    </div>
                    <div>
                      <strong className="text-brand-text block">GitHub</strong>
                      <p className="text-brand-muted text-sm">View my code</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* What to Expect Card */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 hover:border-ocean-tangerine-dream/40 transition-all duration-300"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-ocean-tangerine-dream/15 text-ocean-tangerine-dream">
                    <Coffee size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">Process Overview</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal text-xs font-bold">1</div>
                    <div>
                      <p className="text-brand-text font-medium text-sm">Initial Discussion</p>
                      <p className="text-brand-muted text-xs">Brief call to understand requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal text-xs font-bold">2</div>
                    <div>
                      <p className="text-brand-text font-medium text-sm">Scope Review</p>
                      <p className="text-brand-muted text-xs">Assess objectives and deliverables</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal text-xs font-bold">3</div>
                    <div>
                      <p className="text-brand-text font-medium text-sm">Proposal</p>
                      <p className="text-brand-muted text-xs">Timeline and engagement details</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Response Time & Preferred Contact */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 hover:border-ocean-pearl-aqua/40 transition-all duration-300"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-ocean-pearl-aqua/15 text-ocean-pearl-aqua">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">Response Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-white/5">
                    <span className="text-brand-muted text-sm">Avg. Response Time</span>
                    <span className="text-brand-teal font-bold">Under 24 hours</span>
                  </div>
                  <div>
                    <p className="text-brand-muted text-xs mb-2 uppercase tracking-wide">Preferred Contact Methods</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-ocean-tangerine-dream" />
                        <span className="text-brand-text text-sm">This Contact Form</span>
                        <span className="ml-auto text-xs text-brand-muted">#1 Preferred</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-brand-muted" />
                        <span className="text-brand-text text-sm">LinkedIn Message</span>
                        <span className="ml-auto text-xs text-brand-muted">#2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-brand-muted" />
                        <span className="text-brand-text text-sm">Email Directly</span>
                        <span className="ml-auto text-xs text-brand-muted">#3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Terminal Quote Card */}
              <motion.div
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <TerminalBlock title="Approach">
                  <div className="space-y-2 text-sm text-brand-text">
                    <p>&gt; Strategy-first, execution-focused</p>
                    <p>&gt; Data-driven decisions</p>
                    <p className="text-brand-teal animate-pulse">&gt; _</p>
                  </div>
                </TerminalBlock>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                className="rounded-2xl border border-brand-teal/30 bg-gradient-to-br from-brand-teal/10 to-brand-teal/5 backdrop-blur p-6 text-center hover:border-brand-teal/50 transition-all duration-300"
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2 text-brand-text">View Portfolio</h3>
                <p className="text-brand-muted mb-4">
                  Review case studies and project outcomes.
                </p>
                <OceanRippleButton
                  asLink
                  href="/case-studies"
                  variant="outline"
                  size="md"
                  className="inline-flex items-center gap-2"
                  aria-label="View case studies"
                >
                  Case Studies
                  <ArrowRight size={16} />
                </OceanRippleButton>
              </motion.div>
            </div>
          </div>
        </div>
        </section>
      </main>
    </OceanAuroraBackground>
  );
};

export default Contact;
