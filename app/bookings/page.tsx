import { getServerSession } from 'next-auth';
import Header from '../_components/header';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '../_lib/prisma';
import BookingItem from '../_components/booking-item';
import { Key } from 'react';
import Search from '../_components/search';

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lte: new Date(),
        }
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])

  return (
    <>
      <Header inputComponent={<Search />} />

      {confirmedBookings.length > 0 || finishedBookings > 0 ? (
        <div className="px-5 py-6 lg:px-24">
          <h1 className='text-xl font-bold mb-6'>Agendamentos</h1>

          {confirmedBookings.length > 0 && (
            <>
              <h2 className='text-gray-400 uppercase font-bold text-sm mt-6 mb-3'>Confirmados</h2>

              <div className="flex flex-col gap-3">
                {confirmedBookings.map((booking: { id: Key | null | undefined; }) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}

          {finishedBookings.length > 0 && (
            <>
              <h2 className='text-gray-400 uppercase font-bold text-sm mt-6 mb-3'>Finalizados</h2>

              <div className="flex flex-col gap-3">
                {finishedBookings.map((booking: { id: Key | null | undefined; }) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="px-5 py-6">
          <h1 className='text-xl font-bold'>Agendamentos</h1>
          <p className='text-gray-400'>Você ainda não tem agendamentos.</p>
        </div>
      )}
    </>
  );
}

export default BookingsPage;