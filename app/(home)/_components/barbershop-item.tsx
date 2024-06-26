"use client";

import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Barbershop } from '@prisma/client';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  
  const router = useRouter();

  //redireciona o usuário para a página da barbearia
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  }

  return ( 
    <Card className='min-w-full max-w-[167px] rounded-2xl'>
      <CardContent className='px-1 py-0 pt-1'>
        <div className="w-full h-[159px] relative">
          <div className='absolute top-3 left-3 z-50'>
          <Badge variant='secondary' className='opacity-90 flex gap-1 items-center top-3 left-3'> 
            <StarIcon size={12} className='fill-primary text-primary'/>
            <span className='text-xs'>5,0</span>
          </Badge>
          </div>
          
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            width={0}
            fill
            style={{
              objectFit: "cover",
            }}
            height={0}
            sizes='100vw'
            className='rounded-2xl'
          />
        </div>

        <div className='px-2 pb-3'>
          <h2 className='font-bold mt-2 overflow-hidden text-ellipsis text-nowrap'>{barbershop.name}</h2>
          <p className='text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap'>{barbershop.address}</p>
          <Button className='w-full mt-3' variant='secondary' onClick={handleBookingClick}>Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
 
export default BarbershopItem;