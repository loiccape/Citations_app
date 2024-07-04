'use client'
import React, { useState } from 'react';
import Header from '../../components/header';
import { Separator } from '@/components/ui/separator';
import CitationsContext from '../contexts/CitationsContext';
import { citationsData } from '../data/CitationData';
import { CitationModel } from '../models/CitationModel';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [citations, setCitations] = useState<CitationModel[]>(citationsData);

  const addNewCitation = (newCitation: CitationModel) => {
    setCitations(prevCitations => [...prevCitations, newCitation]);
  };

  return (
    <CitationsContext.Provider
      value={{
        citations: citations,
        addNewCitation: addNewCitation // Pass the function here
      }}
    >
      <section className="p-4">
        <Header />
        <Separator className="my-4" />
        {children}
      </section>
    </CitationsContext.Provider>
  );
}
