import React, { createContext, useContext, useState } from 'react';
import { CitationModel } from '../models/CitationModel';

interface CitationContextType {
  citations: CitationModel[],
  addNewCitation: (newCitation: CitationModel) => void,
  applyFilters: (sort: string, search: string) => void
}

const CitationContext = createContext<CitationContextType>({
  citations: [],
  addNewCitation: (newCitation: CitationModel) => {},
  applyFilters: (sort:string , search: string) => {}
});

export default CitationContext;
