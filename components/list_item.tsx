// ListItem.tsx
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';
import { CitationModel } from '../app/models/CitationModel'

interface ListItemProps {
    citation: CitationModel;
}

const ListItem: React.FC<ListItemProps> = ({ citation }) => {
    return (
        <li className='border p-4 flex justify-between mb-4'>
            <div className='flex flex-col justify-between'>
                <div className='flex items-center'>
                    <BadgeCheck />
                    <p className='text-2xl font-bold ms-3'>{citation.citation}</p>
                </div>
                <p className='text-primary'>{citation.personne} - {citation.date}</p>
            </div>

            <div className='flex'>
                <div className='flex flex-col justify-center items-center w-12 text-primary font-semibold'>
                    <p>{citation.likes}</p>
                    <ThumbsUp />
                </div>
                <div className='flex flex-col justify-center items-center w-12 font-semibold'>
                    <p>{citation.dislikes}</p>
                    <ThumbsDown />
                </div>
            </div>
        </li>
    );
};

export default ListItem;
