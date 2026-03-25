export async function getAllGamesLoader() {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEYS}&page_size=30`,
  );
  const data = await promise.json();
  return data.results;
}
