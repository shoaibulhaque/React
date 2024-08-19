import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("Help");

  // It takes two arguments, second one is optional, first is a callback function
  useEffect(() => {
    console.log("State Updated!", word);
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h1>Let's get the definition for {word}</h1>
    </>
  );
}
