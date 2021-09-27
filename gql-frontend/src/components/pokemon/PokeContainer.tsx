// gql-frontend/src/components/pokemon/PokeContainer.tsx

import { Suspense } from 'react';
import { Pokedex } from './Pokedex';

const PokeContainer: React.FC = () => {
  return (
    <Suspense fallback={<h2>Loading pokedex...</h2>}>
      <Pokedex />
    </Suspense>
  );
};

export default PokeContainer;
