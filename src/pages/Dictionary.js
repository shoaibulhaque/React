import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary(Props) {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded"
        onClick={() => {
          navigate("/definition/" + word);
        }}
      >
        Search
      </button>
    </>
  );
}
