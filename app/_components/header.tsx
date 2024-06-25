"use client"

import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CalendarDays, ChevronDownIcon, LogOutIcon, MenuIcon, UserCircle2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideMenu from './side-menu';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { AlertDialog } from './ui/alert-dialog';
import DialogLogin from './dialog-login';

interface HeaderProps {
  inputComponent?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ inputComponent }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const handleLogoutClick = () => signOut();

  return (
    <>
      <header className="flex justify-between items-center p-5 lg:px-24 border-b ">
        <Link href="/">
          <Image src="/logo.svg" alt="FSW Barber" height={16} width={100} />
        </Link>

        {inputComponent && (
          <div className="hidden w-1/2 lg:block">{inputComponent}</div>
        )}

        <div className='hidden lg:flex space-x-8'>
          <Link href='/bookings' className='flex gap-2 items-center hover:bg-secondary rounded-sm p-2'>
            <CalendarDays />
            <h3>Agendamentos</h3>
          </Link>

          {data?.user ? (
            <div className='flex gap-2 items-center'>
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

              <h3>{data.user?.name}</h3>

                <div className="group relative cursor-pointer">
                  <div className="group flex items-center justify-between space-x-5 px-2">
                    <a className="group-hover:rotate-180 menu-hover my-2 text-base font-medium text-white">
                      <ChevronDownIcon className='' size={18} />
                    </a>
                  </div>
                  <div className="invisible absolute -right-3 z-50 flex w-[120px] flex-col py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                    <Button 
                      variant='default' 
                      className="flex justify-center items-center gap-2 font-semibold text-white"
                      onClick={handleLogoutClick}
                    >                  
                      sair
                      <LogOutIcon size={14}/>
                    </Button>
                  </div>
                </div>


              {/* <ChevronDownIcon size={18} className='hover: cursor-pointer' /> */}
            </div>
          ) : (
            <Button onClick={() => setIsConfirmDialogOpen(true)} variant='default' className='w-full justify-start'>
              <UserCircle2 className='mr-2' size={18} />
              Fazer login
            </Button>
          )}
        </div>

        <Card className='lg:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className='p-0'>
              <SideMenu />
            </SheetContent>
          </Sheet>
        </Card>
      </header>

      <div onClick={() => setIsConfirmDialogOpen(false)}>
        <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogLogin />
        </AlertDialog>
      </div>

    </>
  );
}

export default Header;