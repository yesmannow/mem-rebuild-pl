import React from 'react';
import { Sparkles } from 'lucide-react';
import { BrandTokens } from './types';

interface MarkStepProps {
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}

const MarkStep: React.FC<MarkStepProps> = ({ tokens, setTokens }) => {
  return (
    <div className="step-panel">
      <h2>Design Your Mark</h2>
      <p>Create or upload your logo mark</p>
      <div className="mark-editor">
        <div className="mark-preview">
          <Sparkles size={64} />
        </div>
        <p className="text-center text-gray-400">
          Logo mark editor coming soon. Upload functionality will be available here.
        </p>
      </div>
    </div>
  );
};

export default MarkStep;
