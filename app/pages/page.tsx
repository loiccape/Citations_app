import React, { useContext, useState } from 'react';
import MyList from '@/components/MyList';

export default function Accueil() {

    return (
       
            <div className='h-[85vh] p-4 overflow-y-auto'>
                <MyList/>
            </div>
    );
}
