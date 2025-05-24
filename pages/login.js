import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "@/utils";

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

    // let hasError = false;

    // if (formData.email.trim().length < 2) {
    //   setError((prevError) => ({
    //     ...prevError,
    //     email: "Email is required",
    //   }));
    //   hasError = true;
    // }
    // if (formData.password.trim().length < 2) {
    //   setError((prevError) => ({
    //     ...prevError,
    //     password: "Password is required",
    //   }));
    //   hasError = true;
    // }
    // if (hasError) {
    //   return;
    // }
    // setError({ email: "", password: "" });

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);

      const res = await axios.post(
        `${baseUrl}/api/auth/login_user`,
        {
          email: 'arun@gmail.com',
          password: 'password123',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // email: data.get("email"),
      // password: data.get("password"),
      console.log("login res  =====>", res);

      // if (res.status == 200) {
      //   toast.success("Successfully Login");
      //   router.push("/");
      // } else {
      //   toast.error(res.error);
      // }
    } catch (e) {
      console.log("error ===>", e);
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
    <div className="container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Enter your email and password</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email@domain.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input-field"
          />
          <p className="error-text">{error.email}</p>

          <div className="relative">
            <input
              type={passwordEncrypt ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input-field"
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordEncrypt(!passwordEncrypt)}
            >
              {passwordEncrypt ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
          </div>

          <p className="error-text">{error.password}</p>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
