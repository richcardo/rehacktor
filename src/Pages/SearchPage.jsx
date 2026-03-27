import { useLoaderData } from "react-router";
import { useParams } from "react-router";
import GameList from "../Components/GameList";
import GameCard from "../Components/GameCard";

export default function SearchPage() {
  const { slug } = useParams();
  const games = useLoaderData();
  console.log(games);
  return (
    <>
      <h1 className="text-center text-3xl mt-10">Search by {slug}</h1>
      <GameList>
        {games &&
          games.map((game) => {
            return <GameList.Card key={game.id} game={game} />;
          })}
      </GameList>
    </>
  );
}
