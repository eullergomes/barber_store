"use server"

import { db } from '@/app/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

//pegar todas as reservas de uma determinada data
export const getDayBookings = async (date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date), //menor do que o final do dia
        gte: startOfDay(date), //menor do que o inicio do dia
      },
    },
  });

  return bookings;
};