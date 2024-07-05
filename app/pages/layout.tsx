'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { Separator } from '@/components/ui/separator';
import CitationsContext from '../contexts/CitationsContext';
import { citationsData } from '../data/CitationData';
import { CitationModel } from '../models/CitationModel';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [citations, setCitations] = useState<CitationModel[]>(citationsData);
  const [filteredCitations, setFilteredCitations] = useState<CitationModel[]>(citationsData);

  const addNewCitation = (newCitation: CitationModel) => {
    setCitations(prevCitations => [...prevCitations, newCitation]);
    setFilteredCitations(prevCitations => [...prevCitations, newCitation]);
  };

  const applyFilters = (sort: string, search: string) => {
    let filtered = [...citations];

    // Filter by search term
    if (search) {
      filtered = filtered.filter(citation =>
        citation.citation.toLowerCase().includes(search.toLowerCase()) ||
        citation.personne.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by criteria
    switch (sort) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'personne':
        filtered.sort((a, b) => a.personne.localeCompare(b.personne));
        break;
      case 'like':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'dislike':
        filtered.sort((a, b) => b.dislikes - a.dislikes);
        break;
      default:
        break;
    }

    setFilteredCitations(filtered);
  };

  return (
    <CitationsContext.Provider
      value={{
        citations: filteredCitations,
        addNewCitation: addNewCitation,
        applyFilters: applyFilters
      }}
    >
      <section className="p-4">
        <Header />
        <Separator className="my-4" />
        {children}
        <Toaster/>
      </section>
    </CitationsContext.Provider>
  );
}
