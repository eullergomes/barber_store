"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import { Button } from "@/app/_components/ui/button"
import { LogInIcon } from 'lucide-react';

import { signIn } from 'next-auth/react';


const handleLoginClick = () => signIn("google"); 

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='secondary' className='w-full justify-start'>
          <LogInIcon className='mr-2' size={18} />
            Fazer login
        </Button>

      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Fazer login na plataforma</AlertDialogTitle>
          <AlertDialogDescription>
            Conecte-se usando sua conta do Google ou Github.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLoginClick}>Google</AlertDialogCancel>
          <AlertDialogAction>Github</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
