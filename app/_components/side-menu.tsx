"use client";

import { SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import DialogLogin from './dialog-login';

const SideMenu = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const handleLoginClick = () => {
    if (!data?.user) return signIn('google');
  }

  const handleLogoutClick = () => signOut();

  return (
    <>
      <SheetHeader className='text-left border-b border-solid border-secundary p-5'>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className='flex items-center gap-3'>

            <Avatar>
              <AvatarImage
                src={data.user?.image as string | undefined}
                alt={data.user?.name as string}
              />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>

            <h2 className='font-bold'>{data.user?.name}</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='secondary' size='icon'>
                <LogOutIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-2/3 rounded-md'>
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja sair da sua conta?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='m-0 w-full'>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild onClick={handleLogoutClick} className='w-full'>
                  <Button variant='destructive'>
                    Sair
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className='flex flex-col gap-3 px-5 py-6'>
          <div className="flex items-center gap-2 mb-4">
            <UserIcon size={28} />
            <h2 className='font-bold'>Olá, faça seu login!</h2>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-3 px-5'>
        {!data?.user && (
          <Button onClick={() => setIsConfirmDialogOpen(true)} variant='secondary' className='w-full justify-start'>
            <LogInIcon className='mr-2' size={18} />
            Fazer login
          </Button>
        )}

        <Button variant='outline' className='justify-start' asChild>
          <Link href='/'>
            <HomeIcon className='mr-2' size={18} />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button onClick={handleLoginClick} variant='outline' className='justify-start' asChild>
            <Link href='/bookings'>
              <CalendarIcon className='mr-2' size={18} />
              Agendamentos
            </Link>

          </Button>
        )}
      </div>

      <div onClick={() => setIsConfirmDialogOpen(false)}>
        <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogLogin />
        </AlertDialog>
      </div>
    </>
  );
}

export default SideMenu;