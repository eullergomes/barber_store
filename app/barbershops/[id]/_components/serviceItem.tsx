"use client"

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/app/_components/ui/sheet';
import { Barbershop, Service } from '@prisma/client';
import { ptBR } from 'date-fns/locale/pt-BR';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { generateDayTimeList } from '../_helpers/hours';
import { format, setHours, setMinutes } from 'date-fns';
import { saveBooking } from '../_actions/save-booking';
import { Loader2 } from 'lucide-react';

interface ServiceItemProps {
  service: Service
  isAuthenticated: boolean
  barbershop: Barbershop
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {

  const {data} = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined) //initial date underfined
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  //resetar o horario selecionado após mudar a data
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  }

  const hundleHourClick = (time: string) => {
    setHour(time);
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    } 
  }

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    try {
      if (!hour || !date || !data?.user) {
        return
      }

      /*
      Ex: 09:45  ->   ['09':'45']
      dateHour = 09
      dateMinutes = '45'
      */

      const dateHour = Number(hour.split(':')[0]);
      const dateMinutes = Number(hour.split(':')[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serviceId: service.id,
        userId: (data.user as any).id,
        date: newDate,
        barbershopId: barbershop.id,
      });
    } catch (error) {
      console.log(error);
      
    } finally {
      setSubmitIsLoading(false);
    }
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  return ( 
    <Card>
      <CardContent className='p-3 w-full'>
        <div className="flex gap-4 items-center w-full">
          <div className='min-w-[110px] min-h-[110px] max-h-[110px] maz-w-[110px] relative'>
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='secondary'>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className='p-0'>
                  <SheetHeader className='text-left px-5 py6 border-b border-solid border-secondary'>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6 px-5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()} //não selecionar data anteriores ao dia de hoje
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {/* Mostrar lista de horários apenas uma data estiver sendo selecionada */}
                  {date && (
                    <div className='flex gap-3 py-6 px-5 border-t border-solid border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                      {timeList.map((time) => (
                        <Button variant={hour === time ? 'default' : 'outline'} className='rounded-full' key={time} onClick={() => hundleHourClick(time)}>{time}</Button>
                      ))}

                    </div>
                  )}

                  <div className='py-6 px-5  border-t border-solid border-secondary'>
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
                    <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitIsLoading}>
                      {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}      
                      Confirmar reserva  
                    </Button>
                      
                  </SheetFooter>

                </SheetContent>  
              </Sheet>
                
              
              
            </div>
          </div>
        </div>
      </CardContent>

      
    </Card>
   );
}
 
export default ServiceItem;

