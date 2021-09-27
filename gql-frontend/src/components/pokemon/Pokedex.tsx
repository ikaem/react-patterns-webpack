import { Suspense } from 'react';
import useSWR from 'swr';
import LoadingSkeleton from '../Skeleton';
import Pokemon from './Pokemon';

export const Pokedex = () => {
  const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=150');

  console.log({ data, error });
  return (
    <div>
      {data.results.map((pokemon: { name: string }) => (
        <Suspense fallback={<LoadingSkeleton />}>
          <Pokemon key={pokemon.name} pokemonName={pokemon.name} />
        </Suspense>
      ))}
    </div>
  );
};
