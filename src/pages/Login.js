import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function login() {}

  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        id="customer"
        onSubmit={(e) => {
          e.preventDefault();
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
