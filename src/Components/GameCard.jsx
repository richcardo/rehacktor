export default function GameCard({game}) {
  return (
    <div className="h-[200px] relative">
      <img src={game.background_image} className="w-full h-full brightness-50" alt="" />
      <p className="absolute bottom-px w-full text-center text-white">{game.name}</p>
    </div>
  )
}