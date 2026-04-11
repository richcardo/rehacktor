import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router"; 
import { supabase } from "../database/supabase";
import routes from "../router/routes";

export default function ProfileSettingsPage() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  // Assicurati che UserContext passi 'profile' e 'getUser'
  const { updateProfile, profile, getUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Pulizia della memoria quando il componente smonta o il file cambia
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!file || !profile?.id) return; // Controllo di sicurezza

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}-${Math.random()}.${fileExt}`;

      // 1. Upload su Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Update della tabella profiles
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({ id: profile.id, avatar_url: fileName });

      if (updateError) throw updateError;

      // 3. Aggiorna lo stato globale dell'utente
      await getUser();
      alert("Avatar aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'upload:", error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      navigate(routes.profile);
    } catch (error) {
      console.error("Errore aggiornamento dati:", error.message);
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-10">
      {/* FORM DATI */}
      <form
        className="p-10 bg-nav-gray w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Name"
          className="input input-lg mb-5 w-full text-black"
          {...register("first_name", { required: "This field is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500 mb-6">{errors.first_name.message}</p>
        )}

        <input
          type="text"
          placeholder="Last Name"
          className="input input-lg mb-5 w-full text-black"
          {...register("last_name", { required: "This field is required" })}
        />
        {errors.last_name && (
          <p className="text-red-500 mb-6">{errors.last_name.message}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="input input-lg mb-5 w-full text-black"
          {...register("username", { required: "This field is required" })}
        />
        {errors.username && (
          <p className="text-red-500 mb-6">{errors.username.message}</p>
        )}

        <button type="submit" className="btn btn-neutral p-5 w-full">
          Edit Profile Info
        </button>
      </form>

      {/* FORM AVATAR */}
      <div className="p-10 bg-nav-gray w-1/2 flex flex-col items-center">
        <form className="w-full" onSubmit={handleAvatarSubmit}>
          <input
            type="file"
            className="file-input file-input-lg w-full mb-5"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-neutral p-5 w-full"
            disabled={!file}
          >
            Change Avatar
          </button>
        </form>
        {preview && (
          <div className="mt-5">
            <p className="text-sm mb-2 text-center">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border-2 border-white"
            />
          </div>
        )}
      </div>
    </main>
  );
}
