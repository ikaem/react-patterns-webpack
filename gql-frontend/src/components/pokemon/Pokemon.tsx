// Pokemon.tsx

import useSWR from 'swr';

type Props = {
  pokemonName: string;
};

const Pokemon: React.FC<Props> = ({ pokemonName }) => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  if (error || data.error) return <div />;
  if (!data) return <div>Loading...</div>;

  const { id, name, sprites, types } = data;

  const pokemonTypes = types.map((pokemonType) => pokemonType.type.name);

  return (
    <div>
      <div>
        <h2>{name}</h2>
        <div>#{id}</div>
      </div>

      <img src={sprites.front_default} alt={name} />

      <div>
        {pokemonTypes.map((type) => (
          <div key={type}>{type}</div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
