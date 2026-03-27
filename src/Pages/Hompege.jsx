import { useLoaderData } from "react-router";
import GameList from "../Components/GameList";
export default function Hompege() {
  const data = useLoaderData();
  const getData = async () => {
    const promise = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEYS}&search=mario`,
    );
    const json = await promise.json();
    console.log(json);
  };

  getData();
  return (
    <>
      <h1 className="text-center text-3xl mt-10">Homepage</h1>
      <GameList>
        {data &&
          data.map((game) => {
            return <GameList.Card key={game.id} game={game} />;
          })}
      </GameList>
    </>
  );
}
