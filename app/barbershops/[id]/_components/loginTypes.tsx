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

interface AlertDialogDemoProps {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AlertDialogDemo({ isConfirmDialogOpen, setIsConfirmDialogOpen }: AlertDialogDemoProps) {

  return (
    <>
    <div onClick={() => setIsConfirmDialogOpen(prev => {
      if (prev == false) return true
      return true
    })}>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
      <AlertDialogTrigger asChild>
        <Button variant='secondary' className='w-full justify-start'>
          <LogInIcon className='mr-2' size={18} />
            Fazer login
        </Button>

      </AlertDialogTrigger>
      <AlertDialogContent className='w-2/3'>
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
    </div>
    </>
  )
}
