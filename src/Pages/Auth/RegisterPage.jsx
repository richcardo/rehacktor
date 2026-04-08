import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { supabase } from "../../database/supabase";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);
  const Navigate = useNavigate();

  const onSubmit = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });
    Navigate("/");
  };
  return (
    <>
      <main className="flex justify-center gap-4">
        <h1 className="text-center text-4xl">Register</h1>
        <form
          className="p-10 bg-gray-50 w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Name"
            className="input input-lg mb-5 w-full"
            {...register("first_name", { required: "this filed is required" })}
          />
          {errors.first_name && (
            <p role="alert" className="text-red-500 mb-6">
              {errors.first_name.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            className="input input-lg mb-5 w-full"
            {...register("last_name", { required: "this field is required" })}
          />

          {errors.last_name && (
            <p role="alert" className="text-red-500 mb-6">
              {errors.last_name.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Username"
            className="input input-lg mb-5 w-full"
            {...register("username", { required: "This field is required" })}
          />

          {errors.username && (
            <p role="alert" className="text-red-500 mb-6">
              {errors.username.message}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-lg mb-5 w-full"
            {...register("email", { required: "This field is required" })}
          />

          {errors.email && (
            <p role="alert" className="text-red-500 mb-6">
              {" "}
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input input-lg mb-5 w-full"
            {...register("password", {
              required: "this field is required",
              minLenght: 8,
            })}
          />

          {errors.password && (
            <p role="alert" className="text-red-500 mb-6">
              {errors.password.message}
            </p>
          )}

          <button className="btn btn-neutral p-5">Sign in</button>
        </form>
      </main>
    </>
  );
}
