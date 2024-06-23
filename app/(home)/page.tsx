import Header from '../_components/header';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { Barbershop } from '@prisma/client';
import Main from '../_components/main';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Search from './_components/search';
import BookingItem from '../_components/booking-item';
import { Key } from 'react';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),

    session?.user ? db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date(),
        }
      },
      include: {
        service: true,
        barbershop: true,
      },
    }) : Promise.resolve([])
  ])

  return (
    <div>
      <Header />

      <Main />

      <div className='px-5 mt-6'>
        <Search />
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
          <h2 className='pl-5 text-xs mb-3 uppercase text-gray-400 font-bold'>Agendamentos</h2>
          <div className='px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            {confirmedBookings.map((booking: { id: Key | null | undefined; }) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
          </>
        )}
      </div>

      <div className='mt-5 md:mx-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className='mt-6 mb-[4.5rem] md:mx-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
