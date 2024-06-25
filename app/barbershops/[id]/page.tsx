/* https://localhost:3000/barbershops/[id] */
//[id] parâmetro da rota (dinâmico)

import { db } from '@/app/_lib/prisma';
import BarbershopInfo from './_components/barbershopInfo';
import ServiceItem from './_components/service-item';
import { Service } from '@prisma/client';
import Header from '@/app/_components/header';
import Search from '@/app/_components/search';
// import { getServerSession } from 'next-auth';

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
  //const session = await getServerSession() // === useSession in client component

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
    <>
      <Header inputComponent={<Search />} />

      <div className='lg:px-24 pb-4 lg:pt-4'>
        <BarbershopInfo barbershop={barbershop} />

        <div className="px-5 lg:px-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          {barbershop.services.map((service: Service) => (
            <ServiceItem key={service.id} service={service} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopDetailsPage;