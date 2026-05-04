import { useContext } from "react";
import Ryu from "../assets/images.jpg";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router";
import routes from "../Router/routes.js";
import { supabase } from "../database/supabase";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const context = useContext(UserContext);

  const { user, profile } = context;
  const [avatarUrl, setAvatarUrl] = useState();
  const [userFavourites, setUserFavourites] = useState();

  const download_avatar = async () => {
    if (profile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  const get_favourites = async () => {
    if (profile) {
      const { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);
      setUserFavourites(favourites);
    }
  };

  useEffect(() => {
    download_avatar();
    get_favourites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <main className="h-screen">
      {user && profile && (
        <>
          <article className="mt-10 flex flex-col items-center">
            <img
              src={avatarUrl ?? Ryu}
              className="w-[100px] h-[100px] rounded-full"
              alt="Profile Image"
            />

            <h2 className="text-2xl font-bold mt-5">{profile.first_name}</h2>
          </article>

          <section className="grid grid-cols-3 gap-4 px-36">
            <article className="bg-black text-white rounded-box p-10">
              <h3 className="font-bold">Your data</h3>
              <p>
                Name: {profile.first_name} {profile.last_name}
              </p>
              <p>Username: {profile.username}</p>
              <p>Email: {user.email}</p>
              <Link
                to={routes.profile_settings}
                className="btn btn-outline mt-3"
              >
                Settings
              </Link>
            </article>
          </section>
          <section className="grid grid-cols-4 gap-4 my-10">
            {userFavourites &&
              userFavourites.map((game) => {
                return (
                  <div className="card bg-base-100 shadow-sm" key={game.id}>
                    <div className="card-body">
                      <h2 className="card-title">{game.game_name}</h2>
                    </div>
                  </div>
                );
              })}
          </section>
        </>
      )}
    </main>
  );
}
