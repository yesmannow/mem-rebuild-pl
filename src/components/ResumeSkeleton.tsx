import React from 'react';

import './resume-skeleton.css';



export default function ResumeSkeleton() {

  return (

    <div className="resume-skeleton" aria-hidden="true">

      <div className="s-header" />

      <div className="s-line short" />

      <div className="s-line" />

      <div className="s-section">

        <div className="s-line" />

        <div className="s-line short" />

      </div>

    </div>

  );

}

