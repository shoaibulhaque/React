import { useState, useContext, useEffect } from "react";
import { baseURL } from "../shared";
import { useNavigate, useLocation } from "react-router-dom";
import { loginContext } from "../App";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useContext(loginContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  }, []);

  function register() {
    const url = baseURL + "api/register/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : "/customers"
        ); // using the state object that was sent from customers page
        // to get the url of customers page and navigate back to it
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        id="customer"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <div className="flex justify-center mb-8">
          {/* Replace with your actual logo */}
          <img
            className="object-cover h-[100px] w-[100px] block mx-auto rounded-full sm:mx-0 sm:shrink-0"
            src="/rocket.png"
            alt="Rocket"
          />
        </div>
        <div className="mb-4">
          <input
            id="Username"
            type="text"
            value={username}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <input
            id="email"
            type="email"
            value={email}
            placeholder="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
          <p className="flex flex-col items-center sm:flex-row mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Have an account?
            <a
              className="px-2 no-underline sm: text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              href="/login"
            >
              Sign in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
