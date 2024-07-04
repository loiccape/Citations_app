'use client'
import CitationContext from '@/app/contexts/CitationsContext'
import { CitationModel } from '@/app/models/CitationModel'
import React, { useContext } from 'react'
import ListItem from './list_item'

export default function MyList() {

    const {citations} = useContext(CitationContext)

  return (
    <ul>
                    {citations.map((citation: CitationModel) => (
                        <ListItem key={citation.id} citation={citation} />
                    ))}
                </ul>
  )
}
