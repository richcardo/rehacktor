export async function getAllGamesLoader() {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEYS}&page_size=30`,
  );
  const data = await promise.json();
  return data.results;
}

export async function getSearchedGames({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEYS}&search=${params.slug}`,
  );
  const json = await promise.json();
  return json.results;
}

export async function getAllGenres() {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEYS}`)
  const json = await response.json()
  return json.results
}

export async function getFilteredBuGenreGames({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEYS}&genres=${params.slug}`,
  );
  const json = await promise.json();
  return json.results;
}

export async function getGameDetails({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEYS}`,
  );
  const json = await promise.json();
  return json;
}