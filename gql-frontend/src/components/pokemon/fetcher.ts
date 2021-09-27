// gql-frontend/src/components/pokemon/fetcher.ts

export default async (url: string) => {
  console.log('here is url', url);

  const data = await fetch(url);
  const response = await data.json();

  console.log({ response });

  if (data.ok) return response;

  return {
    error: true,
  };
};
