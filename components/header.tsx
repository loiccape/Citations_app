"use client"
import React, { useState, useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import MyForm from './my_form'
import CitationContext from '@/app/contexts/CitationsContext'
export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('toute');
    const [searchTerm, setSearchTerm] = useState('');
    const { applyFilters } = useContext(CitationContext);

    const handleAddCitationClick = () => {
        setShowMenu(!showMenu);
    }

    const handleSortChange = (value: string) => {
        setSortCriteria(value);
        applyFilters(value, searchTerm);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        applyFilters(sortCriteria, e.target.value);
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Trié par :" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="personne">Personne</SelectItem>
                        <SelectItem value="like">Like</SelectItem>
                        <SelectItem value="dislike">Dislike</SelectItem>
                        <SelectItem value="toute">Toute</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    placeholder='Rechercher'
                    className='ms-3 w-1/2'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                
                    <Button variant={"outline"} onClick={handleAddCitationClick}>Ajouter une citation</Button>
                
            </div>
            {showMenu && (
                <MyForm />
            )}
        </div>
    )
}
