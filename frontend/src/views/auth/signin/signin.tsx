import { useForm } from "react-hook-form";
import { styles } from "../../../styles";
import { Card } from "../../../components/card/card";
import { useContext } from "react";
import { UserContext } from "../../../app/auth";

export function Signin() {
  const { input, button, form } = styles;

  const userContext = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "password",
      email: "great@gmail.com",
    },
  });

  const submitHandler = async (data) => {
    const user_email = data.email;
    const user_password = data.password;

    if (userContext !== null) {
      userContext.signIn(user_email, user_password);
    }
  };
  return (
    <Card title="Sign In">
      <div>{userContext?.user && userContext?.user.email}</div>
      <form
        className={form}
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            className={input}
            id="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                maxLength: (v) =>
                  v.length <= 50 ||
                  "The email should have at most 50 characters",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
          />
          {errors.email?.message && (
            <small className="block text-red-600">{errors.email.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={input}
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (v) =>
                  v.length >= 8 ||
                  "The password should have at least 8 characters",
              },
            })}
          />
          {errors.password?.message && (
            <small className="block text-red-600">
              {errors.password.message}
            </small>
          )}
        </div>

        <button className={button} type="submit">
          Submit
        </button>
      </form>
    </Card>
  );
}
