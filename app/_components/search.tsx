"use client"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  search: z
    .string({
      required_error: "Campo obrigatório"})
      .trim()
      .min(1, "Campo obrigatório"),
});

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter();
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className='flex items-center gap-2'>
      <Form {...form}>
        <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)} >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" >
            <SearchIcon size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;