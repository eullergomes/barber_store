"use client"

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/app/_components/ui/sheet';
import { Barbershop, Booking, Service } from '@prisma/client';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { generateDayTimeList } from '../_helpers/hours';
import { addDays, format, setHours, setMinutes } from 'date-fns';
import { saveBooking } from '../_actions/save-booking';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getDayBookings } from '../_actions/get-day-bookings';
import { AlertDialog } from '@/app/_components/ui/alert-dialog';
import DialogLogin from '@/app/_components/dialog-login';

interface ServiceItemProps {
  service: Service
  barbershop: Barbershop
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {

  const router = useRouter();

  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookins = await getDayBookings(barbershop.id, date);

      setDayBookings(_dayBookins);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  //reset selected time after changing data
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  }

  const hundleHourClick = (time: string) => {
    setHour(time);
  }

  const handleBookingClick = () => {
    if (!data?.user) {
      setIsConfirmDialogOpen(true);
    }
  }

  const handleBookingSubmit = async () => {
    handleBookingClick()

    setSubmitIsLoading(true);

    try {
      if (!hour || !date || !data?.user) {
        return
      }

      const dateHour = Number(hour.split(':')[0]);
      const dateMinutes = Number(hour.split(':')[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);
      console.log(newDate);


      await saveBooking({
        serviceId: service.id,
        userId: (data.user as any).id,
        date: newDate,
        barbershopId: barbershop.id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);

      toast("Agendamento realizado com sucesso", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.log(error);

    } finally {
      setSubmitIsLoading(false);
    }
  }

  //hours available for the selected date
  const timeList = useMemo(() => {
    if (!date) {
      return []
    }

    //list of available hours
    return generateDayTimeList(date).filter(time => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      //check if the time is available
      const booking = dayBookings.find(booking => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      })

      if (!booking) {
        return true;
      }

      return false;
    })

  }, [date, dayBookings]);

  return (
    <>
      <Card>
        <CardContent className='p-3 w-full'>
          <div className="flex gap-4 items-center w-full">
            <div className='min-w-[110px] min-h-[110px] max-h-[110px] max-w-[110px] relative'>
              <Image
                src={service.imageUrl}
                alt={service.name}
                className='rounded-lg'
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>

            <div className='flex flex-col w-full'>
              <h2 className='font=bold'>{service.name}</h2>
              <p className='text-sm text-gray-400'>{service.description}</p>

              <div className="flex justify-between items-center mt-3">
                <p className='text-primary  text-sm font-bold'>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>

                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant='secondary'>
                      Reservar
                    </Button>
                  </SheetTrigger>

                  <SheetContent className='p-0'>
                    <SheetHeader className='text-left px-5 py-2 border-b border-solid border-secondary'>
                      <SheetTitle>Fazer reserva</SheetTitle>
                    </SheetHeader>

                    <div className="">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        locale={ptBR}
                        fromDate={addDays(new Date(), 1)} //select appointment from the next day
                        styles={{
                          head_cell: { //days in top the calendar
                            width: '100%',
                            textTransform: 'capitalize',
                          },
                          cell: {
                            width: '100%', //dates in the calendar
                          },
                          button: {
                            width: '100%',
                          },
                          nav_button_previous: {
                            width: '32px',
                            height: '32px',
                          },
                          nav_button_next: {
                            width: '32px',
                            height: '32px',
                          },
                          caption: {
                            textTransform: 'capitalize', //month and year
                          }
                        }}
                      />
                    </div>

                    {/* Show time list only when a date is being selected */}
                    {date && (
                      <div className='flex gap-3 py-2 px-5 border-t border-solid border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                        {timeList.map((time) => (
                          <Button variant={hour === time ? 'default' : 'outline'} className='rounded-full' key={time} onClick={() => hundleHourClick(time)}>{time}</Button>
                        ))}
                      </div>
                    )}

                    <div className='py-4 px-5  border-t border-solid border-secondary'>
                      <Card>
                        <CardContent className='p-3 gap-3 flex flex-col'>
                          <div className="flex justify-between">
                            <h2 className='font-bold'>{service.name}</h2>
                            <h3 className='font-bold'>
                              {" "}
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </h3>
                          </div>

                          {date && (
                            <div className="flex justify-between">
                              <h3 className='text-gray-400'>Data</h3>
                              <h4 className='text-sm'>{format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}</h4>
                            </div>
                          )}

                          {hour && (
                            <div className="flex justify-between">
                              <h3 className='text-gray-400'>Horário</h3>
                              <h4 className='text-sm'>{hour}</h4>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <h3 className='text-gray-400'>Barbearia</h3>
                            <h4 className='text-sm'>{barbershop.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <SheetFooter className='px-5'>
                      <Button className='w-full' onClick={handleBookingSubmit} disabled={!hour || !date || submitIsLoading}>
                        {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirmar reserva
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          <div onClick={() => setIsConfirmDialogOpen(false)}>
            <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
              <DialogLogin />
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ServiceItem;