"use server"

import { db } from '@/app/_lib/prisma';
import { revalidatePath } from 'next/cache';

interface saveBookingProps {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: saveBookingProps) => {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId
    }
  })

  revalidatePath('/')
  revalidatePath('/bookings');
}