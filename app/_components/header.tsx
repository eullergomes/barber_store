"use client"

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CalendarDays, MenuIcon, UserCircle2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideMenu from './side-menu';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

const Header = () => {
  const { data } = useSession();

  return (
    //<Navbar/>
    <Card className='md:px-28'>
      <CardContent className='p-5 flex justify-between items-center'>
        <Link href="/">
          <Image src="/logo.svg" alt="FSW Barber" height={16} width={100} />
        </Link>

        <div className='hidden md:flex space-x-8'>
          <div className='flex gap-2 items-center'>
            <CalendarDays />
            <h3>Agendamentos</h3>
          </div>

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
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <UserCircle2 />
              <h3>Perfil</h3>
            </div>
          )}
        </div>

        <Card className='md:hidden'>
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

      </CardContent>
    </Card>
  );
}

export default Header;