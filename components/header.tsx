"use client"
import React, { useState } from 'react'
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

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const handleAddCitationClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Trié par :" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="personne">Personne</SelectItem>
                        <SelectItem value="like">Like</SelectItem>
                        <SelectItem value="dislike">Dislike</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder='Rechercher' className='ms-3 w-1/2' />
                <div>
                    <Button variant={"outline"} onClick={handleAddCitationClick}>Ajouter une citation</Button>
                    <Button variant={"outline"} className='ms-3'>Connection</Button>
                </div>
            </div>
            {showMenu && (
                <MyForm/>
            )}
        </div>
    )
}
