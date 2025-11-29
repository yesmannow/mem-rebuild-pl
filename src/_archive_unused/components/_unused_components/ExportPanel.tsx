import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { renderOG } from '../lib/renderOG'; // your Satori + resvg helper
import { buildTokens } from '../lib/styleDictionary'; // your Style Dictionary build
import fs from 'node:fs';
import path from 'node:path';

interface ExportPanelProps {
  readonly tokens: {
    name: string;
    colors: { [key: string]: string };
    font: { heading: string; body: string };
  };
}

const styles = StyleSheet.create({
  page: { padding: 24 },
  section: { marginBottom: 16 },
});

function BrandPDF({ tokens }: ExportPanelProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>{tokens.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Palette:</Text>
          {Object.entries(tokens.colors).map(([k, v]) => (
            <Text key={k}>
              {k}: {v}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Typography:</Text>
          <Text>Heading: {tokens.font.heading}</Text>
          <Text>Body: {tokens.font.body}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function ExportPanel({ tokens }: ExportPanelProps) {
  const [ogUrl, setOgUrl] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);

  const handleOG = async () => {
    setBuilding(true);
    const blob = await renderOG(tokens);

    // Save the OG image to the public directory
    const buffer = await blob.arrayBuffer();
    const filePath = path.join(
      process.cwd(),
      'public',
      'og',
      `${tokens.name.replaceAll(' ', '-').toLowerCase()}.png`
    );
    fs.writeFileSync(filePath, Buffer.from(buffer));

    setOgUrl(`/og/${tokens.name.replaceAll(' ', '-').toLowerCase()}.png`);
    setBuilding(false);
  };

  const handleTokens = async () => {
    await buildTokens(tokens);
    alert('Design tokens built: CSS vars, Tailwind preset, Figma JSON');
  };

  return (
    <section className="py-16 bg-slate-50 relative">
      <h2 className="text-3xl font-bold text-center mb-8">Export</h2>

      <div className="flex flex-col items-center gap-6">
        {/* PDF Export */}
        <PDFDownloadLink
          document={<BrandPDF tokens={tokens} />}
          fileName={`${tokens.name}-brand-board.pdf`}
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          {({ loading }: { loading: boolean }) =>
            loading ? 'Generating PDF...' : 'Download PDF Brand Board'
          }
        </PDFDownloadLink>

        {/* OG/PNG Export */}
        <button onClick={handleOG} className="px-6 py-3 bg-amber-500 text-white rounded">
          {building ? 'Rendering OG...' : 'Generate OG/PNG Preview'}
        </button>
        {ogUrl && (
          <a href={ogUrl} download={`${tokens.name}-og.png`} className="text-blue-600 underline">
            Download OG Image
          </a>
        )}

        {/* Tokens Export */}
        <button onClick={handleTokens} className="px-6 py-3 bg-green-600 text-white rounded">
          Build Design Tokens
        </button>
      </div>
    </section>
  );
}
