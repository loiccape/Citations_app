'use client'

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { format } from 'date-fns'  // Import correct

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

import { CitationModel } from '@/app/models/CitationModel'
import CitationsContext from '@/app/contexts/CitationsContext'
import { useToast } from './ui/use-toast'


const formSchema = z.object({
    personne: z.string().min(2, { message: "Minimum 2 caractères" }).max(50, { message: "Maximum 50 caractères" }),
    citation: z.string().min(2, { message: "Minimum 2 caractères" }).max(100, { message: "Maximum 100 caractères" }),
    date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Date invalide" }),
    
})

export default function MyForm() {

    const {toast} = useToast()
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personne: "",
            citation: "",
            date: format(new Date(), 'yyyy-MM-dd')
        },
    })

    const {addNewCitation} = useContext(CitationsContext)

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newCitation: CitationModel = {
            id: 0,
            citation: values.citation,
            personne: values.personne,
            date: values.date,
            likes: 0,
            dislikes: 0,
        }
        addNewCitation(newCitation)
        toast({
            title:"Citation Crée",
            description: newCitation.citation
        })
        form.reset({personne:"",citation:"",date:""})
    }

    return (
        <div className='p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="personne"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personne</FormLabel>
                                <FormControl>
                                    <Input placeholder="Personne qui a dit cette citation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="citation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Citation</FormLabel>
                                <FormControl>
                                    <Input placeholder="La citation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(selectedDate) => {
                                                    setDate(selectedDate);
                                                    field.onChange(format(selectedDate!, 'yyyy-MM-dd')); // Update form state with formatted date
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
