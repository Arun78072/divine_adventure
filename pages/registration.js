import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Registration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordEncrypt, setPasswordEncrypt] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    referralCode: "",
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
    referralCode: "",
  });

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
    if (formData.referralCode.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        referralCode: "Referral Code is required",
      }));
      hasError = true;
    }

    if (formData.name.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        name: "Name is required",
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
    } else {
      setError({
        email: "",
        name: "",
        password: "",
        referralCode: "",
      });
    }

    try {
      const res = await signIn("credentials", {
        ...formData,
        type: "CreateUser",
        redirect: false,
      });
      console.log("res ====>", res.error.split(" ")[0]);
      if (res.status == 200) {
        toast.success("Successfully create an account");
        router.push("/");
      } else if (res.error.split(" ")[0] == "E11000") {
        toast.error("Email already registered");
      }
    } catch (e) {
      console.log("error ===>", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray p-8 rounded-lg shadow-md max-w-sm bg-[#D9D9D9] w-full  my-28">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create account
        </h2>
        <p className="text-center text-base font-normal text-gray-600 mb-8">
          Enter your details to sign up
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 px-2 py-3 w-96  border border-gray-300 rounded-md focus:outline-none placeholder:text-[#828282] border-[#E0E0E0] w-full"
          />
          <p className="h-6 text-red-500 ml-2">{error.name}</p>
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
          <input
            type="text"
            placeholder="Referal Code"
            value={formData.referralCode}
            onChange={(e) =>
              setFormData({ ...formData, referralCode: e.target.value })
            }
            className="w-full p-3 px-2 py-3 w-96  border border-gray-300 rounded-md focus:outline-none placeholder:text-[#828282] border-[#E0E0E0] w-full"
          />
          <p className="h-6 text-red-500 ml-2">{error.referralCode}</p>
          <button
            type="submit"
            className="w-full px-2 py-3 w-96 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition mb-6"
          >
            Sign up
          </button>
        </form>

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

export default Registration;
