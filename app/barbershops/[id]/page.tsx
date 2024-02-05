/* https://localhost:3000/barbershops/[id] */
//[id] parâmetro da rota (dinâmico)

import { db } from '@/app/_lib/prisma';
import BarbershopInfo from './_components/barbershopInfo';
import ServiceItem from './_components/serviceItem';
import { Service } from '@prisma/client';
import { getServerSession } from 'next-auth';

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {

  const session = await getServerSession() // === useSession in client component

  if (!params.id) {
    //TODO: redireciona para home page
    return null;
  }

  //seleciona a barberia com o respectivo id do link
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true, //incluir a tabela services que tem dentro da tabela barbershop
    },
  });

  if (!barbershop) {
    //TODO: redireciona para home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop}/>

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service: Service) => (
          <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} barbershop={barbershop}/>
        ))}
      </div>
      
      
    </div>
    
  );
};
 
export default BarbershopDetailsPage;