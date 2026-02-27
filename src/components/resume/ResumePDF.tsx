import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { DossierFormData } from './DossierForm';

Font.register({
  family: 'Helvetica',
  fonts: [],
});

const HEALTHCARE_COMPANIES = ['Graston Technique', 'Pike Medical', 'OrthoIndy'];

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },
  /* ── Header ───────────────────────────────────────── */
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 3,
  },
  title: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 4,
  },
  contact: {
    fontSize: 9,
    color: '#555555',
  },
  targeting: {
    fontSize: 8,
    color: '#888888',
    marginTop: 4,
    fontFamily: 'Helvetica-Oblique',
  },
  /* ── Section ──────────────────────────────────────── */
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 3,
    marginBottom: 8,
  },
  /* ── Experience entry ─────────────────────────────── */
  expEntry: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  expRole: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  expRoleHighlighted: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    textDecoration: 'underline',
  },
  expCompany: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
  },
  expDates: {
    fontSize: 9,
    color: '#777777',
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 10,
    color: '#555555',
    marginRight: 4,
    lineHeight: 1.4,
  },
  bulletText: {
    fontSize: 9,
    color: '#444444',
    lineHeight: 1.4,
    flex: 1,
  },
  /* ── Skills ───────────────────────────────────────── */
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillPill: {
    fontSize: 8,
    color: '#333333',
    borderWidth: 0.5,
    borderColor: '#bbbbbb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  /* ── Education ────────────────────────────────────── */
  eduEntry: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  eduDegree: {
    fontSize: 9,
    color: '#444444',
  },
  eduYear: {
    fontSize: 8,
    color: '#777777',
  },
  /* ── Summary ──────────────────────────────────────── */
  summaryText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.5,
  },
});

interface ResumeData {
  personal: {
    name: string;
    title: string;
    contact: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    role: string;
    dates: string;
    achievements: string[];
    technologies?: string[];
  }>;
  education: Array<{
    school?: string;
    institution?: string;
    degree: string;
    year: string;
    honors?: string;
    details?: string;
  }>;
  skillCategories?: Record<string, string[]>;
  skills?: string[];
}

interface ResumePDFProps {
  data: ResumeData;
  formData?: DossierFormData;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ data, formData }) => {
  const targetSector = formData?.sector ?? 'General';
  const isHealthcare = targetSector === 'Health';

  const shouldHighlight = (company: string): boolean => {
    if (!isHealthcare) return false;
    return HEALTHCARE_COMPANIES.some((hc) =>
      company.toLowerCase().includes(hc.toLowerCase())
    );
  };

  const flatSkills: string[] = data.skillCategories
    ? Object.values(data.skillCategories).flat().slice(0, 24)
    : (data.skills ?? []).slice(0, 24);

  return (
    <Document
      title={`${data.personal.name} — Resume`}
      author={data.personal.name}
      subject={`${data.personal.title} | Targeting: ${targetSector}`}
    >
      <Page size="A4" style={styles.page}>
        {/* ── HEADER ─────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name}</Text>
          <Text style={styles.title}>{data.personal.title}</Text>
          <Text style={styles.contact}>{data.personal.contact}</Text>
          {formData && (
            <Text style={styles.targeting}>
              Personalized for: {targetSector} | Objective: {formData.objective}
            </Text>
          )}
        </View>

        {/* ── SUMMARY ────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{data.personal.summary}</Text>
        </View>

        {/* ── EXPERIENCE ─────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((job, i) => {
            const highlight = shouldHighlight(job.company);
            return (
              <View key={i} style={styles.expEntry} wrap={false}>
                <View style={styles.expHeader}>
                  <Text style={highlight ? styles.expRoleHighlighted : styles.expRole}>
                    {job.role}
                  </Text>
                  <Text style={styles.expDates}>{job.dates}</Text>
                </View>
                <Text style={styles.expCompany}>{job.company}</Text>
                {job.achievements.slice(0, 3).map((bullet, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        {/* ── SKILLS ─────────────────────────────────── */}
        {flatSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsGrid}>
              {flatSkills.map((skill, i) => (
                <Text key={i} style={styles.skillPill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* ── EDUCATION ──────────────────────────────── */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduEntry}>
                <Text style={styles.eduSchool}>{edu.school ?? (edu as Record<string, string>).institution}</Text>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduYear}>{edu.year}</Text>
                {edu.honors && <Text style={styles.eduDegree}>{edu.honors}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
