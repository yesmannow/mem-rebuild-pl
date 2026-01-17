import React from 'react';
import { Link } from 'react-router-dom';
import './TerminalLogo.css';

interface TerminalLogoProps {
  className?: string;
}

const TerminalLogo: React.FC<TerminalLogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`terminal-logo ${className}`} aria-label="Home">
      <span className="terminal-logo-text" data-text="J_DARLING">
        J_DARLING
      </span>
    </Link>
  );
};

export default TerminalLogo;
