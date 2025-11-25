/**
 * Clinical Protocol Data
 * Extracted from legacy "Graston Clinical Compass.htm"
 */

export interface ProtocolStep {
  area: string;
  stroke: string;
  instruments: string;
}

export interface ProtocolFindings {
  [key: string]: {
    text: string;
  };
}

export interface PathologyData {
  displayName: string;
  baseProtocol: ProtocolStep[];
  findings?: ProtocolFindings;
  adjunctiveCare: string;
}

export interface RegionData {
  displayName: string;
  pathologies: {
    [key: string]: PathologyData;
  };
}

export interface ProtocolData {
  [regionKey: string]: RegionData;
}

export const protocolData: ProtocolData = {
  cervicalSpine: {
    displayName: 'Cervical Spine',
    pathologies: {
      general: {
        displayName: 'General Dysfunction / Postural Strain',
        baseProtocol: [
          {
            area: 'Upper Trapezius / Levator Scapulae',
            stroke: 'Sweep, Fan',
            instruments: 'GT1, GT4, GT5',
          },
          {
            area: 'Cervical Paraspinals (Laminar Groove)',
            stroke: 'J-Stroke',
            instruments: 'GT3',
          },
          {
            area: 'Suboccipitals',
            stroke: 'Sweep, Brush, Strum',
            instruments: 'GT5, GT3',
          },
        ],
        findings: {
          headaches: {
            text: 'Focus on releasing suboccipital tension, a common driver of cervicogenic headaches.',
          },
          forwardHead: {
            text: 'Address shortened anterior structures. Include framing of the clavicle and light sweeps over SCM.',
          },
        },
        adjunctiveCare:
          'Stretching of upper traps & pectorals. Strengthening of deep neck flexors & scapular retractors.',
      },
    },
  },
  shoulder: {
    displayName: 'Shoulder',
    pathologies: {
      impingement: {
        displayName: 'Impingement / RTC Tendinopathy',
        baseProtocol: [
          {
            area: 'Posterior RTC (Infraspinatus/Teres Minor)',
            stroke: 'Sweep, Brush, Strum',
            instruments: 'GT4, GT5, GT2',
          },
          {
            area: 'Supraspinatus (Belly & Tendon)',
            stroke: 'Sweep, Strum',
            instruments: 'GT3, GT2, GT6',
          },
          {
            area: 'Pectoralis Minor',
            stroke: 'Sweep, Fan, Scoop',
            instruments: 'GT3, GT4, GT5',
          },
        ],
        findings: {
          scapularDyskinesis: {
            text: 'Address scapular mobility. Treat restrictions in serratus anterior, rhomboids, and levator scapulae.',
          },
          overheadAthlete: {
            text: 'For overhead athletes, assess and treat the entire kinetic chain.',
          },
        },
        adjunctiveCare: 'Strengthening of external rotators and scapular stabilizers.',
      },
    },
  },
  knee: {
    displayName: 'Knee',
    pathologies: {
      pfps: {
        displayName: 'Patellofemoral Pain Syndrome (PFPS)',
        baseProtocol: [
          {
            area: 'Lateral Retinaculum / Distal ITB',
            stroke: 'J-Stroke, Strum',
            instruments: 'GT3',
          },
          {
            area: 'Vastus Lateralis',
            stroke: 'Sweep, Fan',
            instruments: 'GT1, GT4, GT5',
          },
          {
            area: 'Quadriceps Tendon & Patellar Ligament',
            stroke: 'Brush, Strum',
            instruments: 'GT3, GT6',
          },
        ],
        findings: {
          hipWeakness: {
            text: 'Assess and address hip abductor and external rotator weakness.',
          },
        },
        adjunctiveCare: 'Strengthening of gluteus medius and VMO.',
      },
    },
  },
};

export interface InstrumentInfo {
  name: string;
  image: string;
  rationale: string;
}

export const instrumentData: { [key: string]: InstrumentInfo } = {
  GT1: {
    name: 'GT1: Scanner',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT1.png',
    rationale:
      'The largest Graston instrument, GT1 is expertly designed for "scanning" and treating large muscle groups and fascia. Its broad, gently convex edges allow clinicians to quickly assess tissue texture and efficiently treat areas such as hamstrings, quadriceps, and the back.',
  },
  GT2: {
    name: 'GT2: Multi-Tool',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT2.png',
    rationale:
      'Known as the "workhorse" of the Graston set, GT2 offers a wide range of applications. With single- and double-beveled edges, as well as knobs, GT2 can both scan and treat small to medium muscle groups.',
  },
  GT3: {
    name: 'GT3: Tongue Depressor',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT3.png',
    rationale:
      'The smallest and most precise Graston instrument, GT3 excels at targeting specific, localized lesions and smaller areas—like tendons, ligaments, or pinpoint adhesions.',
  },
  GT4: {
    name: 'GT4: Handlebar',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT4.png',
    rationale:
      "GT4's large, gently convex edge is ideal for sweeping strokes over larger body surfaces. The 'handlebar' grip makes it comfortable for clinicians to treat areas like the IT band, quadriceps, and back.",
  },
  GT5: {
    name: 'GT5: Boomerang',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT5.png',
    rationale:
      "With its signature boomerang shape, GT5 is designed for both scanning and treating convex body parts—think shoulders, calves, and deltoids. Its unique concave and convex edges let clinicians follow the body's natural curves.",
  },
  GT6: {
    name: 'GT6: Hook',
    image: 'https://grastontechnique.com/wp-content/uploads/2022/10/GT6.png',
    rationale:
      'GT6 is the most specialized tool, featuring a precise tip and a unique "hook" shape for accessing tight, hard-to-reach areas—such as around joints or bony prominences.',
  },
};

