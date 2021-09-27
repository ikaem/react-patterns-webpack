import { SWRConfig } from 'swr';
import fetcher from '../components/pokemon/fetcher';
import PokeContainer from '../components/pokemon/PokeContainer';

const PokedexContainer = () => {
  return (
    <div className='issues'>
      <h1>Pokedex</h1>

      <SWRConfig
        value={{
          fetcher,
          suspense: true,
        }}
      >
        <PokeContainer />
      </SWRConfig>
    </div>
  );
};

export default PokedexContainer;
