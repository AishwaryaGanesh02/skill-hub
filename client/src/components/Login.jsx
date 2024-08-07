import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      const body = { email, password };
      const response = await axios.post(
        "http://localhost:1200/api/login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const parseRes = await response.data;
      if (parseRes.token) {
        Cookies.set("token", parseRes.token, { expires: 1 });
        Cookies.set("user_id", parseRes.userid);
        Cookies.set("role", parseRes.role);
        Cookies.set("edgnid", parseRes.degnid);
        alert("Successfully Logged in");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert("Invalid password or Invalid Email");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const { email, password } = user;

  return (
    <div
      style={{
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-textbg"
    >
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-12 md:px-14 md:py-8">
            <span className="mb-1 text-5xl text-center font-bold">Login</span>
            <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
              <div className="py-0.5">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="block w-full mt-1.5 rounded-md box-border border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="py-0.5">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  className="block w-full mt-1.5 rounded-md box-border border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button className="w-full bg-primary-100 text-white py-2 px-1 rounded-lg mb-2 hover:border-gray-300 mt-2">
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/SignUp" className="font-bold">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              //   src={Limage}
              alt="Background"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover bg-[#F9F9F9]"
            />
            <div className="absolute hidden bottom-10 right-0 p-6 md:block">
              {/* Additional content or styles can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
