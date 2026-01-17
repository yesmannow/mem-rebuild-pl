import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LegalDocumentViewer } from '../../components/legal/LegalDocumentViewer';
import { SimpleSection } from '../../components/ui/SimpleSection';
import TechBackdrop from '../../components/hero/TechBackdrop';

const WorkersCompensationPage: React.FC = () => {
  // Mock legal document data for Workers Compensation Defense
  const legalSections = [
    {
      id: 'overview',
      title: 'Overview',
      content: `
        <p>Workers' compensation defense requires a comprehensive understanding of state regulations, medical evidence, and strategic litigation tactics.</p>
        <p>Our firm represents employers and insurers across all six Indiana Workers' Compensation Board districts, providing strategic defense from initial claim filing through final resolution.</p>
      `,
    },
    {
      id: 'defense-strategies',
      title: 'Defense Strategies',
      content: `
        <p>We employ a multi-faceted approach to workers' compensation defense:</p>
        <ul>
          <li><strong>Early Case Assessment:</strong> Comprehensive evaluation of claim validity and potential exposure</li>
          <li><strong>Medical Evidence Review:</strong> Expert analysis of medical records, IMEs, and treatment protocols</li>
          <li><strong>Witness Preparation:</strong> Strategic development of employer and medical witness testimony</li>
          <li><strong>Settlement Negotiation:</strong> Aggressive pursuit of favorable settlements when appropriate</li>
          <li><strong>Trial Advocacy:</strong> Experienced trial attorneys ready to litigate when necessary</li>
        </ul>
      `,
    },
    {
      id: 'jurisdiction',
      title: 'Jurisdictional Expertise',
      content: `
        <p>Our attorneys are familiar with board members and court reporters in all six Indiana Workers' Compensation Board districts:</p>
        <ul>
          <li>District 1 - Indianapolis</li>
          <li>District 2 - Fort Wayne</li>
          <li>District 3 - South Bend</li>
          <li>District 4 - Evansville</li>
          <li>District 5 - Terre Haute</li>
          <li>District 6 - Jeffersonville</li>
        </ul>
        <p>This statewide coverage ensures consistent representation regardless of where a claim is filed.</p>
      `,
    },
    {
      id: 'case-types',
      title: 'Case Types Handled',
      content: `
        <p>We handle all types of workers' compensation claims, including:</p>
        <ul>
          <li><strong>Injury Claims:</strong> Traumatic injuries, repetitive stress injuries, and occupational diseases</li>
          <li><strong>Disability Disputes:</strong> Temporary and permanent disability determinations</li>
          <li><strong>Medical Treatment:</strong> Disputes over reasonableness and necessity of medical care</li>
          <li><strong>Vocational Rehabilitation:</strong> Return-to-work programs and vocational assessments</li>
          <li><strong>Subrogation:</strong> Recovery of benefits paid on behalf of injured workers</li>
        </ul>
      `,
    },
    {
      id: 'success-metrics',
      title: 'Success Metrics',
      content: `
        <p>Our track record demonstrates consistent results:</p>
        <ul>
          <li><strong>Case Resolution Time:</strong> Average 40% reduction in case duration</li>
          <li><strong>Settlement Outcomes:</strong> 75% of cases resolved favorably through negotiation</li>
          <li><strong>Trial Success Rate:</strong> 85% favorable outcomes in litigated matters</li>
          <li><strong>Client Satisfaction:</strong> 95% client retention rate</li>
        </ul>
      `,
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `
        <p>For immediate assistance with a workers' compensation claim, contact our 24/7 emergency line:</p>
        <p><strong>Phone:</strong> (317) 555-0123</p>
        <p><strong>Email:</strong> workerscomp@rbelaw.com</p>
        <p>Our team is available around the clock to respond to urgent claims and emergency situations.</p>
      `,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Workers' Compensation Defense | RBE Law</title>
        <meta
          name="description"
          content="Expert workers' compensation defense for employers and insurers across Indiana. Navigate claims with confidence."
        />
      </Helmet>

      {/* Hero Section */}
      <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <TechBackdrop className="absolute inset-0" />
        <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Workers Compensation Defense
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Strategic defense representation for employers and insurers across all Indiana Workers' Compensation Board districts.
              </p>
            </motion.div>
          </div>
        </div>
      </SimpleSection>

      {/* Legal Document Viewer */}
      <LegalDocumentViewer
        title="Workers Compensation Defense Guide"
        sections={legalSections}
      />
    </>
  );
};

export default WorkersCompensationPage;
