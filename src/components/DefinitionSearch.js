import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className="items-center p-4 flex justify-center flex-col"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        navigate("/dictionary/" + word);
      }}
    >
      <div>
        <h1 className=" mb-4 font-mono font-semibold">Search for Words!</h1>
      </div>

      <div className="flex justify-center items-center w-full max-w-md">
        <input
          placeholder="Programming"
          className="shrink min-w-0 py-[0.45rem] mr-2 rounded px-2 border border-gray-300"
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded">
          Search
        </button>
      </div>
    </form>
  );
}
