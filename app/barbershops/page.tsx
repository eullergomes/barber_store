import { Barbershop } from '@prisma/client';
import BarbershopItem from '../(home)/_components/barbershop-item';
import Header from '../_components/header';
import { db } from '../_lib/prisma';
import { redirect } from 'next/navigation';
import Search from '../_components/search';

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect('/');
  }

  const barbershops: Barbershop[] = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive' //doesn't matter if it's uppercase or lowercase
      }
    }
  })

  return (
    <>
      <Header />

      <div className="px-5 py-5 lg:px-24 space-y-6">
        <div className='lg:hidden'>
          <Search 
            defaultValues={{
              search: searchParams.search
            }}
          />
        </div>
        <h1 className='text-gray-400 font-bold text-xs uppercase'>Resultados para &quot;{searchParams.search}&quot;</h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map(barbershop => (
            <div className='w-full' key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BarbershopsPage;