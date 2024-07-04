import React, { createContext, useContext, useState } from 'react';
import { CitationModel } from '../models/CitationModel';

interface CitationContextType {
  citations: CitationModel[],
  addNewCitation: (newCitation: CitationModel) => void // Update to accept a new citation
}

const CitationContext = createContext<CitationContextType>({
  citations: [],
  addNewCitation: (newCitation: CitationModel) => {} // Provide a default empty function
});

export default CitationContext;
