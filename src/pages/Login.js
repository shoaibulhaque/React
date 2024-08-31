import { useState, useContext } from "react";
import { baseURL } from "../shared";
import { useNavigate, useLocation } from "react-router-dom";
import { loginContext } from "../App";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(loginContext);
  const location = useLocation();
  const navigate = useNavigate();

  function login() {
    const url = baseURL + "api/token/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          login();
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
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
