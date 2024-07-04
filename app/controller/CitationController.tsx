import { citationsData } from "../data/CitationData";
import { CitationModel } from "../models/CitationModel";

export function createCitationController(citation: CitationModel) {
    const newId = citationsData.length + 1
    const newCitation: CitationModel = {
        id: newId,
        citation: citation.citation,
        personne : citation.personne,
        date: citation.date,
        likes: citation.likes,
        dislikes: citation.dislikes
    }
    console.log("Controller");
    
    citationsData.push(newCitation)

    console.log(citationsData);
}
