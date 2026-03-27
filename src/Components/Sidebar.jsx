import { Link } from "react-router"
export default function Sidebar({genres}) {
  return (
    <>
    <nav className="h-screen bg-gray-400 ">
      <ul className="px-5">
        {
          genres.map((genre)=> {
            return (
              <li key={genre.id} className="mb-2"><Link to={`genre/${genre.slug}`}>{genre.name}</Link></li>
            )
          })
        }
      </ul>
    </nav>
    </>
  )
}