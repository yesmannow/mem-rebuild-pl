/**
 * License Requirements Data
 * Extracted from legacy "Practitioner License Requirements.htm"
 */

export interface StateLicenseData {
  stateName: string;
  boardName: string;
  boardUrl: string;
  [key: string]: string | undefined; // Dynamic fields for different professions
}

export interface LicenseData {
  [stateCode: string]: StateLicenseData;
}

// Physical Therapy
export const stateData_pt: LicenseData = {
  AL: {
    stateName: 'Alabama',
    boardName: 'Alabama Board of Physical Therapy',
    boardUrl: 'http://www.pt.alabama.gov/',
    ptHours: '10 Hours',
    ptaHours: '10 Hours',
    notes: 'Renewed annually. Requires 2-hour AL Jurisprudence course every 5 years.',
  },
  AK: {
    stateName: 'Alaska',
    boardName: 'Alaska State PT & OT Board',
    boardUrl:
      'https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/PhysicalTherapyandOccupationalTherapy.aspx',
    ptHours: '24 Hours',
    ptaHours: '24 Hours',
    notes: 'Renewed biennially in even years. Requires 2 hours of ethics.',
  },
  AZ: {
    stateName: 'Arizona',
    boardName: 'Arizona State Board of Physical Therapy',
    boardUrl: 'https://ptboard.az.gov/',
    ptHours: '20 Hours',
    ptaHours: '10 Hours',
    notes: 'Renewed biennially. At least 10 PT hours must be Category A.',
  },
  // Add more states as needed - this is a sample
  CA: {
    stateName: 'California',
    boardName: 'Physical Therapy Board of California',
    boardUrl: 'https://www.ptbc.ca.gov/',
    ptHours: '30 Hours',
    ptaHours: '30 Hours',
    notes: 'Requires 2 hrs Ethics/Laws & 4 hrs Basic Life Support. First renewal only 15 hours.',
  },
  TX: {
    stateName: 'Texas',
    boardName: 'Texas Board of Physical Therapy Examiners',
    boardUrl: 'https://www.ptot.texas.gov/',
    ptHours: '30 CCUs',
    ptaHours: '20 CCUs',
    notes: 'Renewed biennially. Requires passing score on Jurisprudence Assessment Module (TX JAM).',
  },
  NY: {
    stateName: 'New York',
    boardName: 'NY State Board for Physical Therapy',
    boardUrl: 'http://www.op.nysed.gov/prof/pt/',
    ptHours: '36 Hours',
    ptaHours: '36 Hours',
    notes: 'Renewed every 3 years. No CE required for first renewal.',
  },
};

// Occupational Therapy
export const stateData_ot: LicenseData = {
  AL: {
    stateName: 'Alabama',
    boardName: 'AL State Board of OT',
    boardUrl: 'http://www.ot.alabama.gov/',
    otHours: '20 Hours',
    otaHours: '10 Hours',
    notes: '1 hour must be in AL OT jurisprudence. Renewal every 2 years.',
  },
  CA: {
    stateName: 'California',
    boardName: 'CA Board of OT',
    boardUrl: 'https://www.bot.ca.gov/',
    otHours: '24 PDUs',
    otaHours: '24 PDUs',
    notes: 'Requires 1 hour in ethics. Renewal every 2 years.',
  },
  TX: {
    stateName: 'Texas',
    boardName: 'Texas Board of OT Examiners',
    boardUrl: 'https://www.ptot.texas.gov/',
    otHours: '24 Hours',
    otaHours: '24 Hours',
    notes: 'Renewed biennially.',
  },
};

// Chiropractic
export const stateData_dc: LicenseData = {
  AL: {
    stateName: 'Alabama',
    boardName: 'Alabama State Board of Chiropractic Examiners',
    boardUrl: 'https://alchiroboard.gov/',
    totalHours: '12 Hours',
    renewalCycle: '1 Year',
    renewalDate: 'October 1',
    notes: 'Requires 2 hours of risk management.',
  },
  CA: {
    stateName: 'California',
    boardName: 'California Board of Chiropractic Examiners',
    boardUrl: 'https://www.chiro.ca.gov/',
    totalHours: '24 Hours',
    renewalCycle: '2 Years',
    renewalDate: 'June 8',
    notes: 'Requires 2 hrs ethics/law, 4 hrs in specific subjects. Max 12 hrs distance learning.',
  },
  TX: {
    stateName: 'Texas',
    boardName: 'Texas Board of Chiropractic Examiners',
    boardUrl: 'https://www.tbce.state.tx.us/',
    totalHours: '12 Hours',
    renewalCycle: '1 Year',
    notes: 'The state of Texas requires 12 hours per year, including 3 hours for rules and 1 hour for risk management.',
  },
};

// Athletic Training
export const stateData_at: LicenseData = {
  AL: {
    stateName: 'Alabama',
    boardName: 'Alabama Board of Athletic Trainers',
    boardUrl: 'https://alboatonline.gov/',
    regulationType: 'Licensure',
    stateSpecificHours: '40 Hours',
    notes: '30 contact hours (CEU) of continuing professional education during each two (2) year renewal period, 12 face to face.',
  },
  CA: {
    stateName: 'California',
    boardName: 'No State Regulatory Board',
    boardUrl: 'https://www.bocatc.org/state-regulation/california-state-regulation',
    regulationType: 'No State Regulation',
    stateSpecificHours: 'N/A',
    notes: 'California does not have state licensure or regulation for ATs. Practice is governed solely by national BOC certification.',
  },
  TX: {
    stateName: 'Texas',
    boardName: 'Texas Department of Licensing and Regulations',
    boardUrl: 'https://www.tdlr.texas.gov/at/at.htm',
    regulationType: 'Licensure',
    stateSpecificHours: 'BOC',
    notes: 'must maintain their BOC and follow what BOC requires',
  },
};

export type ProfessionType = 'pt' | 'ot' | 'dc' | 'at';

export const getLicenseData = (profession: ProfessionType): LicenseData => {
  switch (profession) {
    case 'pt':
      return stateData_pt;
    case 'ot':
      return stateData_ot;
    case 'dc':
      return stateData_dc;
    case 'at':
      return stateData_at;
    default:
      return stateData_pt;
  }
};

