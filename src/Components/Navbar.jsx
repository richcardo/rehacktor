import { useState } from "react";
import { Link } from "react-router";
import routes from "../Router/routes";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  const [slug, setSlug] = useState();
  const HandleChange = (e) => {
    setSlug(e.target.value);
  };

  const navigate = useNavigate();

  const { user, signOut } = useContext(UserContext);

  const handleLogout = async () => {
    console.log(user);
    await navigate("/");
    signOut();
    console.log(user);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={routes.home}>
          Rehacktor
        </Link>
      </div>
      <div className="flex gap-2 content-center items-center">
        <input
          onChange={HandleChange}
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <Link to={`/search/${slug}`}>
          <button className="btn btn-sm">Search</button>
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            {(!user && (
              <>
                <li>
                  <Link to={routes.register}>Register</Link>
                </li>
                <li>
                  <Link to={routes.login}>Login</Link>
                </li>
              </>
            )) || (
              <>
                <li>
                  <Link to={routes.profile}>Profile</Link>
                </li>
                <li onClick={handleLogout}>
                  <p>Logout</p>
                </li>
              </>
            )}
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
