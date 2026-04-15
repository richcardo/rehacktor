import { Link } from "react-router";
export default function GameCard({ game }) {
  return (
    <div className="h-[200px] relative">
      <Link to={`/detail/${game.id}`}>
        <img
          src={game.background_image}
          className="w-full h-full brightness-50"
          alt=""
        />
      </Link>
      <p className="absolute bottom-px w-full text-center text-white">
        {game.name}
      </p>
    </div>
  );
}
