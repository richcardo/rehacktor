import GameCard from "./GameCard"

export default function GameList({children}) {
  return (
    <div className="grid grid-cols-4 gap-4 px-5 my-5">
      {children}
    </div>
  )
}

GameList.Card = GameCard