"use client"

import { Button } from '@/app/_components/ui/button';
import { Barbershop } from '@prisma/client';
import { ChevronLeftIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BarbershopDetailsinfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopDetailsinfoProps) => {
  
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  }
  
  return ( 
    <>
      <div className='h-[250px] w-full relative'>
        <Button onClick={handleBackClick} size='icon' variant='outline' className='z-50 absolute top-4 left-4'>
          <ChevronLeftIcon />
        </Button>

        <Image 
          src={barbershop.imageUrl} 
          alt={barbershop.name}
          fill
          style={{
            objectFit: 'cover',
          }}
          className='opacity-75'
        />
      </div>

      <div className='px-5 lg:px-0 pt-3 pb-6 border-solid border-secundary'>
        <h1 className='text-xl lg:text-2xl font-bold py-3'>{barbershop.name}</h1>
        
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className='text-primary' size={18}/>
          <p className='text-sm'>{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className='text-primary' size={18}/>
          <p className='text-sm'>5,0 (899 avaliações)</p>
        </div>
      </div>
    </>
   );
}
 
export default BarbershopInfo;