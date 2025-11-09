import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Send, MessageSquare, User, Building2, Phone, FileText } from "lucide-react";
import AnimatedSection from "../components/animations/AnimatedSection";
import MagneticButton from "../components/interactive/MagneticButton";
import { fadeInUp } from "../utils/animations";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  message: string;
  reason: string;
  company?: string;
  phone?: string;
}

const CONTACT_REASONS = [
  { value: "job-opportunity", label: "Job Opportunity", description: "Interested in hiring me" },
  { value: "collaboration", label: "Collaboration", description: "Want to work together" },
  { value: "consulting", label: "Consulting Inquiry", description: "Need marketing expertise" },
  { value: "interview", label: "Interview Request", description: "Would like to interview" },
  { value: "question", label: "General Question", description: "Have a question" },
  { value: "other", label: "Other", description: "Something else" }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    reason: "",
    company: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form interactions
  React.useEffect(() => {
    import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
      trackPortfolioEngagement.contactFormStart();
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Using Web3Forms - submissions will go to your email
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b6c0916d-2dba-4faf-933e-fcdd6c683a88",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reason: formData.reason,
          subject: `Portfolio Contact: ${formData.reason || 'General Inquiry'}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", reason: "", company: "", phone: "" });

        // Track successful submission
        import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
          trackPortfolioEngagement.contactFormSubmit(formData.reason || "general");
        });
      } else {
        setError("Failed to send message. Please try again.");
        import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
          trackPortfolioEngagement.contactFormError(result.message || "Unknown error");
        });
      }
    } catch (err) {
      setError("An error occurred. Please try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <AnimatedSection>
        <section className="contact-header">
          <motion.h1 variants={fadeInUp}>Let's Create What Doesn't Exist Yet.</motion.h1>
          <motion.p className="lead" variants={fadeInUp}>
            I'm currently open to new opportunities in marketing leadership and tech integration.
            Feel free to reach out for interviews, collaborations, or any questions—I'd love to connect!
            <br /><br />
            Have a challenge that needs solving? A system that needs building? An idea that needs shaping?
            <br /><br />
            Let's talk.
          </motion.p>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="contact-content">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="form-section">
              <h2>Send a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message Received.</h3>
                  <p>I'll be in touch within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <User size={16} className="inline mr-2" />
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <Mail size={16} className="inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">
                      <MessageSquare size={16} className="inline mr-2" />
                      Reason for Contact *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a reason...</option>
                      {CONTACT_REASONS.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label} - {reason.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">
                      <Building2 size={16} className="inline mr-2" />
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <Phone size={16} className="inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <FileText size={16} className="inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={18} className="inline mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Contact Info & Links */}
            <div className="info-section">
              <div className="info-card">
                <h3>Get In Touch</h3>
                <p>Prefer to reach out directly? Use any of these options:</p>

                <div className="contact-methods">
                  <motion.a
                    href="mailto:jacob@jacobdarling.com"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Mail size={24} />
                    </span>
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
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Linkedin size={24} />
                    </span>
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
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Github size={24} />
                    </span>
                    <div>
                      <strong>GitHub</strong>
                      <p>View my code</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="quote-card">
                <blockquote>
                  "Systems create freedom — let's design one that works for you."
                </blockquote>
              </div>

              <div className="cta-card">
                <h3>Want to see my work?</h3>
                <p>Explore my case studies to see how I solve real business challenges.</p>
                <Link to="/case-studies" className="btn-secondary">
                  View Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Contact;