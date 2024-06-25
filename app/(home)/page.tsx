import Header from '../_components/header';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { Barbershop } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Search from '../_components/search';
import BookingItem from '../_components/booking-item';
import { Key } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),

    db.barbershop.findMany({
      orderBy: {
        id: 'asc'
      }
    }),

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
    <>
      <Header />

      <div className="px-5 pt-5 lg:px-24">
        <h2 className="text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className='px-5 mt-6 lg:px-24'>
        <Search />
      </div>

      <div className="mt-6 lg:px-24">
        {confirmedBookings.length > 0 && (
          <>
          <h2 className='pl-5 text-xs mb-3 uppercase text-gray-400 font-bold'>Agendamentos</h2>
          <div className='px-5 lg:px-0 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            {confirmedBookings.map((booking: { id: Key | null | undefined; }) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
          </>
        )}
      </div>

      <div className='mt-5 lg:px-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div className='flex px-5 lg:px-0 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop: Barbershop) => (
            <div className='min-w-[167px]' key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6 mb-[4.5rem] lg:px-24'>
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div className='flex px-5 lg:px-0 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {recommendedBarbershops.map((barbershop: Barbershop) => (
            <div className='min-w-[167px]' key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
      </>
  );
}
