"use client"

import { useSession } from 'next-auth/react';
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale';

const   Main = () => {
  const { data } = useSession();

  return (
    //Está errado
    <main className="h-20 flex items-center justify-center object-cover" >
        {data?.user ? (
        
        <div> 
          <h2 className='text-xl font-bold'>{`Olá, ${data.user?.name}!`}</h2>
          <p className="capitalize">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
          </p> 
        </div>

      ) : (
        <div>
          <h2 className='text-xl font-bold'>Olá, faça o seu login!</h2>
          <p className="capitalize">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
          </p> 
        </div>
      )}

    </main>
  )

};


export default Main;

