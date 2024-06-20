"use server"

import { db } from '@/app/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

//pegar todas as reservas de uma determinada data e barbearia
export const getDayBookings = async (barbershopId: string, date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date), //menor do que o final do dia (23:59:59)
        gte: startOfDay(date), //maior do que o inicio do dia (00:00:00)
      },
    },
  });

  return bookings;
};