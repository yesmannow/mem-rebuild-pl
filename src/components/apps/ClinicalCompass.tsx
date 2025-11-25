import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { protocolData, instrumentData, ProtocolData } from '../../data/protocolData';

type Step = 0 | 1 | 2 | 3;

const ClinicalCompass: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [principles, setPrinciples] = useState<string[]>([]);
  const [patientAcuity, setPatientAcuity] = useState('Chronic');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPathology, setSelectedPathology] = useState('');
  const [texture, setTexture] = useState('fibrotic');
  const [selectedFindings, setSelectedFindings] = useState<string[]>([]);
  const [protocolResult, setProtocolResult] = useState<JSX.Element | null>(null);

  const regions = Object.keys(protocolData).map((key) => ({
    key,
    displayName: protocolData[key].displayName,
  }));

  const pathologies = selectedRegion
    ? Object.keys(protocolData[selectedRegion].pathologies).map((key) => ({
        key,
        displayName: protocolData[selectedRegion].pathologies[key].displayName,
      }))
    : [];

  const findings = selectedRegion && selectedPathology
    ? protocolData[selectedRegion].pathologies[selectedPathology].findings || {}
    : {};

  useEffect(() => {
    if (selectedRegion) {
      setSelectedPathology('');
      setSelectedFindings([]);
    }
  }, [selectedRegion]);

  const togglePrinciple = (value: string) => {
    setPrinciples((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const toggleFinding = (value: string) => {
    setSelectedFindings((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return principles.length === 3;
      case 1:
        return selectedRegion !== '';
      case 2:
        return selectedPathology !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && canProceed()) {
      setCurrentStep((prev) => (prev + 1) as Step);
    } else if (currentStep === 3) {
      generateProtocol();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const generateProtocol = () => {
    if (!selectedRegion || !selectedPathology) return;

    const pathologyData = protocolData[selectedRegion].pathologies[selectedPathology];
    const regionData = protocolData[selectedRegion];

    const protocolTable = (
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-brand-dark mb-6 border-b-2 border-brand-teal pb-2">
          Clinical Protocol Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <strong className="text-brand-dark">Region:</strong>{' '}
            <span className="text-brand-teal">{regionData.displayName}</span>
          </div>
          <div>
            <strong className="text-brand-dark">Pathology:</strong>{' '}
            <span className="text-brand-teal">{pathologyData.displayName}</span>
          </div>
        </div>

        <h4 className="text-xl font-semibold text-brand-teal mb-4">Treatment Protocol</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-brand-teal text-white">
                <th className="p-4 text-left font-semibold">Treatment Area</th>
                <th className="p-4 text-left font-semibold">Stroke Technique</th>
                <th className="p-4 text-left font-semibold">Recommended Instruments</th>
              </tr>
            </thead>
            <tbody>
              {pathologyData.baseProtocol.map((step, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4">{step.area}</td>
                  <td className="p-4">{step.stroke}</td>
                  <td className="p-4">
                    {step.instruments.split(', ').map((inst, i) => (
                      <span key={i}>
                        <button
                          onClick={() => showInstrumentInfo(inst.trim())}
                          className="text-brand-teal font-semibold hover:underline border-b-2 border-dotted border-brand-teal"
                        >
                          {inst.trim()}
                        </button>
                        {i < step.instruments.split(', ').length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedFindings.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-brand-teal mb-3">Clinical Considerations</h4>
            <ul className="list-disc list-inside space-y-2 text-brand-dark">
              {selectedFindings.map((finding) => {
                const findingData = pathologyData.findings?.[finding];
                return findingData ? <li key={finding}>{findingData.text}</li> : null;
              })}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-xl font-semibold text-brand-teal mb-3">
            Adjunctive Care Recommendations
          </h4>
          <p className="text-brand-dark">{pathologyData.adjunctiveCare}</p>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal/90 transition-colors"
          >
            🖨️ Print Protocol
          </button>
          <button
            onClick={resetBuilder}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 Start Over
          </button>
        </div>
      </div>
    );

    setProtocolResult(protocolTable);
  };

  const showInstrumentInfo = (instCode: string) => {
    const data = instrumentData[instCode];
    if (data) {
      alert(`${data.name}\n\n${data.rationale}`);
    }
  };

  const resetBuilder = () => {
    setCurrentStep(0);
    setPrinciples([]);
    setSelectedRegion('');
    setSelectedPathology('');
    setSelectedFindings([]);
    setProtocolResult(null);
  };

  const steps = ['Principles', 'Profile', 'Assessment', 'Refinement'];

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Graston Clinical Compass</h1>
          <p className="text-brand-muted text-lg">
            A situational tool to guide your clinical reasoning and treatment protocol.
          </p>
        </motion.div>

        <div className="bg-brand-surface rounded-2xl p-8 border border-white/10">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="text-center text-gray-600 mb-4">
              Step {currentStep + 1} of 4
            </div>
            <div className="flex gap-4">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex-1 text-center py-3 px-2 rounded-lg border-2 font-semibold transition-all ${
                    idx === currentStep
                      ? 'border-brand-teal bg-blue-50 text-brand-dark'
                      : idx < currentStep
                      ? 'border-brand-teal/50 bg-green-50 text-brand-teal'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {idx + 1}. {step}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Principles */}
              {currentStep === 0 && (
                <div>
                  <label className="block text-lg font-semibold text-brand-dark mb-4">
                    Acknowledge Core Principles
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'eval', label: 'I will differentiate between Evaluation and Treatment strokes.' },
                      { value: 'dosage', label: 'I will consider all Dosage Parameters (stroke, speed, pressure, etc.).' },
                      { value: 'contra', label: 'I have screened my patient for contraindications.' },
                    ].map((principle) => (
                      <label
                        key={principle.value}
                        className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          principles.includes(principle.value)
                            ? 'border-brand-teal bg-blue-50'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={principles.includes(principle.value)}
                          onChange={() => togglePrinciple(principle.value)}
                          className="mt-1 mr-3 w-5 h-5 accent-brand-teal"
                        />
                        <span className="text-brand-dark">{principle.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Profile */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="patientAcuity" className="block text-lg font-semibold text-brand-dark mb-3">
                      Patient Acuity / Tissue Reactivity
                    </label>
                    <select
                      id="patientAcuity"
                      value={patientAcuity}
                      onChange={(e) => setPatientAcuity(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value="Chronic">Chronic / Low Reactivity</option>
                      <option value="Subacute">Subacute / Moderate Reactivity</option>
                      <option value="Acute">Acute / High Reactivity</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="regionSelect" className="block text-lg font-semibold text-brand-dark mb-3">
                      Anatomical Region
                    </label>
                    <select
                      id="regionSelect"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value="">-- Select Region --</option>
                      {regions.map((region) => (
                        <option key={region.key} value={region.key}>
                          {region.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Assessment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="pathologySelect" className="block text-lg font-semibold text-brand-dark mb-3">
                      Suspected Pathology / Dysfunction
                    </label>
                    <select
                      id="pathologySelect"
                      value={selectedPathology}
                      onChange={(e) => setSelectedPathology(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value="">-- Select Pathology --</option>
                      {pathologies.map((pathology) => (
                        <option key={pathology.key} value={pathology.key}>
                          {pathology.displayName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="textureSelect" className="block text-lg font-semibold text-brand-dark mb-3">
                      Primary Tissue Texture Finding
                    </label>
                    <select
                      id="textureSelect"
                      value={texture}
                      onChange={(e) => setTexture(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option value="fibrotic">Fibrotic / Ropey</option>
                      <option value="adhesion">Broad Adhesion</option>
                      <option value="gritty">Focal / Gritty Point</option>
                      <option value="sensitive">Generally Sensitive / Reactive</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Refinement */}
              {currentStep === 3 && (
                <div>
                  <label className="block text-lg font-semibold text-brand-dark mb-4">
                    Select Key Clinical Findings (if any)
                  </label>
                  <div className="space-y-3">
                    {Object.keys(findings).map((findingKey) => {
                      const finding = findings[findingKey];
                      return (
                        <label
                          key={findingKey}
                          className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedFindings.includes(findingKey)
                              ? 'border-brand-teal bg-blue-50'
                              : 'border-gray-300 bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedFindings.includes(findingKey)}
                            onChange={() => toggleFinding(findingKey)}
                            className="mt-1 mr-3 w-5 h-5 accent-brand-teal"
                          />
                          <span className="text-brand-dark">{finding.text}</span>
                        </label>
                      );
                    })}
                    {Object.keys(findings).length === 0 && (
                      <p className="text-gray-500">No additional findings available for this pathology.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                currentStep === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-brand-teal border-2 border-brand-teal hover:bg-brand-teal hover:text-white'
              }`}
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                canProceed()
                  ? 'bg-brand-teal text-white hover:bg-brand-teal/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 3 ? 'Generate Protocol 🚀' : 'Next →'}
            </button>
          </div>

          {/* Protocol Result */}
          {protocolResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-gray-300"
            >
              {protocolResult}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalCompass;

