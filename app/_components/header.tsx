"use client"

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Fallback } from '@radix-ui/react-avatar';
import Link from 'next/link';

const Header = () => {
  const {data, status} = useSession();

  const handleLoginClick = () => signIn("google"); 

  const handleLogoutClick = () => signOut();

  return ( 
    <Card>
      <CardContent className='p-5 flex justify-between items-center flex-row'>
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120}/>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16}/>
            </Button>
          </SheetTrigger>

          <SheetContent className='p-0'>
            <SheetHeader className='text-left border-b border-solid border-secundary p-5'>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex justify-between px-5 py-6 items-center">
                <div className='flex items-center gap-3'>

                  <Avatar>
                    <AvatarImage src={data.user?.image as string}/>
                  </Avatar>                

                  <h2 className='font-bold'>{data.user?.name}</h2>
                </div>

                <Button variant='secondary' size='icon'>
                  <LogOutIcon onClick={handleLogoutClick}/>
                </Button>
              </div>
            ) : (              
              <div className='flex flex-col gap-3 px-5 py-6'>
                <div className="flex items-center gap-2">
                  <UserIcon size={32}/>
                  <h2 className='font-bold'>Olá, faça seu login!</h2>
                </div>
                
                <Button onClick={handleLoginClick} variant='secondary' className='w-full justify-start'>
                  <LogInIcon className='mr-2' size={18} />
                  Fazer login
                </Button>
              </div>
            )}

            <div className='flex flex-col gap-3 px-5'>
              <Button onClick={handleLoginClick} variant='outline' className='justify-start' asChild>
                {/* redirect */}
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

          </SheetContent>
        </Sheet>
      </CardContent>
    </Card> 
  );
}
 
export default Header;