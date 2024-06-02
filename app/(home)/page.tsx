import Header from '../_components/header';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { Barbershop } from '@prisma/client';
import Main from '../_components/main';

export default async function Home() {
  //chamar prisma e pegar barbearias
  const barbershops = await db.barbershop.findMany({});
  
  return (
    <div>
      <Header />

      <Main />

      <div className='mt-6 md:mx-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
        </div> 
      </div>

      <div className='mt-6 mb-[4.5rem] md:mx-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>      
          ))}
        </div>
      </div>
      
    </div>
  );
}
