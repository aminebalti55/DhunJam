import { useMutation } from "@tanstack/react-query";
import { getJWT, setJWT } from "../utils/auth";
import { loginAdmin } from "../api/client";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const jwt = getJWT();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginAdmin,
    onError: () => toast.error("Error signing in, please check your details"),
    onSuccess: (data) => {
      setJWT(data.token);
      toast.success("Sign in successful.");
      navigate("/dashboard");
    },
  });
  const login = async (e: any) => {
    e.preventDefault();
    await mutateAsync({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) navigate("/dashboard");
  }, []);
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">VENUE ADMIN</h1>
      <form className="flex flex-col gap-4 w-[300px]" onSubmit={login}>
        <label>LOGIN</label>
        <input
          placeholder="Username"
          name="username"
          className="border-white border rounded-lg px-4 py-2 bg-transparent"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          className="border-white border rounded-lg px-4 py-2 bg-transparent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 rounded-lg bg-violet-600 text-white font-semibold"
        >
          {isPending ? " Loading..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
