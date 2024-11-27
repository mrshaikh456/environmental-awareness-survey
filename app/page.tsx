"use client";

import React, { useState } from 'react';
import EnvironmentalSurvey from '../components/EnvironmentalSurvey'
import ResultsChart from '../components/ResultsChart'
import { Navbar } from '../components/Navbar'

export default function Home() {
  const [showAdminView, setShowAdminView] = useState(false);

  const handleAdminLogin = () => {
    setShowAdminView(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <Navbar onAdminLogin={handleAdminLogin} />
      <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {showAdminView ? <ResultsChart /> : <EnvironmentalSurvey />}
      </main>
    </div>
  );
}

