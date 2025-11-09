import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import resumeData from '../data/resume.json';

// Register fonts - using system fonts for better compatibility
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2',
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.woff2',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2',
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  // Page Layout
  page: {
    backgroundColor: '#ffffff',
    color: '#1f2937',
    padding: 35,
    fontSize: 10,
    fontFamily: 'Inter',
    lineHeight: 1.6,
  },

  // Header Section
  header: {
    marginBottom: 22,
    paddingBottom: 16,
    borderBottom: '3px solid #3B82F6',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: 600,
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#6b7280',
    marginTop: 6,
    gap: 8,
  },
  contactItem: {
    marginRight: 14,
    marginBottom: 3,
  },

  // Professional Summary
  summarySection: {
    marginBottom: 20,
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    borderLeft: '4px solid #3B82F6',
    borderTop: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #3B82F6',
    paddingBottom: 5,
    marginTop: 4,
  },
  summaryText: {
    fontSize: 10.5,
    color: '#374151',
    lineHeight: 1.7,
    textAlign: 'justify',
  },

  // Experience Section
  experienceSection: {
    marginBottom: 20,
  },
  jobEntry: {
    marginBottom: 16,
    paddingBottom: 14,
    paddingTop: 8,
    borderBottom: '1px solid #e5e7eb',
    borderLeft: '2px solid transparent',
    paddingLeft: 6,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitleCompany: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  companyName: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: 600,
    marginBottom: 3,
  },
  jobMeta: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  jobDates: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 600,
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 9,
    color: '#9ca3af',
  },
  jobSummary: {
    fontSize: 9.5,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 1.6,
    fontStyle: 'italic',
    paddingLeft: 4,
  },
  achievementsTitle: {
    fontSize: 8.5,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 6,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  achievementItem: {
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 10,
    lineHeight: 1.5,
    paddingLeft: 6,
  },
  achievementBullet: {
    fontSize: 10,
    color: '#3B82F6',
    marginRight: 6,
    fontWeight: 'bold',
  },

  // Skills & Technologies
  skillsSection: {
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 6,
  },
  skillBadge: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '5 10',
    borderRadius: 4,
    fontSize: 8.5,
    marginBottom: 5,
    marginRight: 5,
    border: '1px solid #bfdbfe',
    fontWeight: 600,
  },
  techBadge: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    padding: '5 10',
    borderRadius: 4,
    fontSize: 8.5,
    marginBottom: 5,
    marginRight: 5,
    border: '1px solid #bbf7d0',
    fontWeight: 600,
  },

  // Education
  educationSection: {
    marginBottom: 18,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  institution: {
    fontSize: 9,
    color: '#3B82F6',
    fontWeight: 600,
    marginBottom: 2,
  },
  eduYear: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  eduDetails: {
    fontSize: 8,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 2,
  },

  // Community Leadership (condensed)
  leadershipSection: {
    marginBottom: 12,
  },
  leadershipItem: {
    marginBottom: 6,
    paddingLeft: 4,
  },
  leadershipRole: {
    fontSize: 9,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 1,
  },
  leadershipOrg: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 1,
  },
  leadershipDates: {
    fontSize: 8,
    color: '#9ca3af',
  },

  // Key Metrics Section (optional, can be removed if space is tight)
  metricsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    border: '2px solid #e5e7eb',
    borderTop: '3px solid #3B82F6',
  },
  metricItem: {
    textAlign: 'center',
    flex: 1,
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 8.5,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: 600,
  },
});

// Helper component for achievement bullets
const AchievementItem = ({ achievement }: { achievement: string }) => {
  // Extract numbers/percentages for emphasis
  const hasNumbers = /\d+%?/.test(achievement);

  return (
    <View style={styles.achievementItem}>
      <Text>
        <Text style={styles.achievementBullet}>▸</Text>
        {achievement}
      </Text>
    </View>
  );
};

export const ResumePDF = () => {
  const {
    name,
    title,
    summary,
    contact,
    experience,
    skills,
    tools,
    education,
    communityLeadership,
    stats,
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Name, Title, Contact */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{contact.location}</Text>
            <Text style={styles.contactItem}>{contact.email}</Text>
            <Text style={styles.contactItem}>{contact.website}</Text>
            <Text style={styles.contactItem}>LinkedIn: {contact.linkedin}</Text>
            <Text style={styles.contactItem}>GitHub: {contact.github.replace('https://', '')}</Text>
          </View>
        </View>

        {/* Key Metrics - Quick Impact Overview */}
        <View style={styles.metricsSection}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{stats.experience}</Text>
            <Text style={styles.metricLabel}>Years Experience</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{stats.practitioners}</Text>
            <Text style={styles.metricLabel}>Practitioners Served</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{stats.caseStudies}</Text>
            <Text style={styles.metricLabel}>Case Studies</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{stats.customApps}</Text>
            <Text style={styles.metricLabel}>Custom Applications</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Professional Experience */}
        <View style={styles.experienceSection}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>

          {experience.map((job, index) => (
            <View key={index} style={styles.jobEntry}>
              <View style={styles.jobHeader}>
                <View style={styles.jobTitleCompany}>
                  <Text style={styles.jobTitle}>{job.role}</Text>
                  <Text style={styles.companyName}>{job.company}</Text>
                </View>
                <View style={styles.jobMeta}>
                  <Text style={styles.jobDates}>{job.dates}</Text>
                  <Text style={styles.jobLocation}>{job.location}</Text>
                </View>
              </View>

              {job.summary && <Text style={styles.jobSummary}>{job.summary}</Text>}

              {job.achievements && job.achievements.length > 0 && (
                <View>
                  <Text style={styles.achievementsTitle}>Key Achievements:</Text>
                  {job.achievements.map((achievement, idx) => (
                    <AchievementItem key={idx} achievement={achievement} />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Two Column Layout for Skills and Education */}
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {/* Left Column - Skills & Technologies */}
          <View style={{ flex: 1.2 }}>
            {/* Core Skills */}
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Core Skills</Text>
              <View style={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Technologies & Tools */}
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Technologies & Tools</Text>
              <View style={styles.skillsGrid}>
                {tools.map((tool, index) => (
                  <Text key={index} style={styles.techBadge}>
                    {tool}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Right Column - Education & Leadership */}
          <View style={{ flex: 1 }}>
            {/* Education */}
            <View style={styles.educationSection}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                  {edu.details && <Text style={styles.eduDetails}>{edu.details}</Text>}
                </View>
              ))}
            </View>

            {/* Community Leadership - Condensed */}
            {communityLeadership && communityLeadership.length > 0 && (
              <View style={styles.leadershipSection}>
                <Text style={styles.sectionTitle}>Community Leadership</Text>
                {communityLeadership.slice(0, 3).map((role, index) => (
                  <View key={index} style={styles.leadershipItem}>
                    <Text style={styles.leadershipRole}>{role.role}</Text>
                    <Text style={styles.leadershipOrg}>{role.organization}</Text>
                    <Text style={styles.leadershipDates}>{role.dates}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
