import { useLoaderData } from "react-router";
import GameList from "../Components/GameList";
export default function Hompege() {
  const data = useLoaderData();
  console.log(data);
  const games = data.results;
  return (
    <>
      <h1>Homepage</h1>
      <GameList>
        {games &&
          games.map((game) => {
            return <GameList.Card key={game.id} game={game} />;
          })}
      </GameList>
    </>
  );
}
