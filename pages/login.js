import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const { data: session } = useSession();
  const [passwordEncrypt, setPasswordEncrypt] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (formData.email.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        email: "Email is required",
      }));
      hasError = true;
    }
    if (formData.password.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required",
      }));
      hasError = true;
    }
    if (hasError) {
      return;
    }
    setError({ email: "", password: "" });

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);
      const res = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        type: "loginUser",
        redirect: false,
      });
      if (res.status == 200) {
        toast.success("Successfully Login");
        router.push("/");
      } else {
        toast.error(res.error);
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  const socialLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn("google", { redirect: false });
      if (res.status == 200) {
        toast.success("Successfully Login");
        // router.push("/");
      }
    } catch (e) {
      console.log("error ===>", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.error) {
      const error = decodeURIComponent(router.query.error);

      console.log(
        "error ===>",
        error == "User not found. Please sign up first."
      );
      toast.error(error);
    }
  }, [router.query.error]);
  useEffect(() => {
    if (session?.user?.id) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-gray p-8 rounded-lg shadow-md max-w-sm bg-[#D9D9D9] w-full my-28">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <p className="text-center text-base font-normal text-gray-600 mb-2">
          Enter your email and password
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email@domain.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 px-2 py-3 w-96  border border-gray-300 rounded-md focus:outline-none placeholder:text-[#828282] border-[#E0E0E0] w-full"
          />
          <p className="h-6 text-red-500 ml-2">{error.email}</p>
          <div className="relative">
            <input
              type={passwordEncrypt ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 px-2 py-3 w-96  border border-gray-300 rounded-md focus:outline-none placeholder:text-[#828282] border-[#E0E0E0] w-full"
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordEncrypt(!passwordEncrypt)}
            >
              {passwordEncrypt ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
          </div>

          <p className="h-6 text-red-500 ml-2">{error.password}</p>
          <button
            type="submit"
            className="w-full px-2 py-3 w-96 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition mb-6"
          >
            Login
          </button>
        </form>

        <span className="mx-4 mb-4 text-[#828282] text-center block">
          or continue with
        </span>

        <button
          onClick={() => {
            socialLogin();
          }}
          className="w-full relative p-3 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition bg-[#EEEEEE]"
        >
          <span className="text-2xl">
            <FcGoogle />
          </span>
          <span className="mx-auto">Google</span>
        </button>

        <div className="flex items-center gap-1 my-5">
          <span className="text-[#828282]">Not a member ? </span>
          <button
            onClick={() => {
              router.push("/registration");
            }}
            className="underline"
          >
            Sign up now
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-black underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
