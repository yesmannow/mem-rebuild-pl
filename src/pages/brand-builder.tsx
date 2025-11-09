'use client';
import React, { useState } from 'react';
import BuilderShell from '../components/BuilderShell';
import MoodboardModule from '../components/MoodboardModule';
import PaletteEditor from '../components/PaletteEditor';
import TypographyModule from '../components/TypographyModule';
import MarkSandbox from '../components/MarkSandbox';
import ApplicationsPanel from '../components/ApplicationsPanel';
import ExportPanel from '../components/ExportPanel';
import SaveShare from '../components/SaveShare';

export default function BrandBuilderPage() {
  const [tokens, setTokens] = useState<any>({
    name: 'My Brand',
    colors: {},
    font: { heading: 'Inter', body: 'Roboto' },
    mark: null,
  });
  const [step, setStep] = useState(0);

  const steps = [
    <MoodboardModule key="m" />,
    <PaletteEditor key="p" baseColors={Object.values(tokens.colors)} />,
    <TypographyModule key="t" />,
    <MarkSandbox key="ms" />,
    <ApplicationsPanel key="a" tokens={tokens} />,
    <ExportPanel key="e" tokens={tokens} />,
    <SaveShare key="s" tokens={tokens} />,
  ];

  return (
    <BuilderShell active={step} setActive={setStep}>
      {steps[step]}
    </BuilderShell>
  );
}
