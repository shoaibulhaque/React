import { useState, useEffect } from "react";

export default function Definition() {
  const [word, setWord] = useState(undefined);

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
      .then((response) => response.json())
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data[0].meanings);
      });
  }, []);

  return (
    <>
      <h1>Here is the definition</h1>
      {word ? (
        word.map((meaning) => (
          <p>
            {meaning.partOfSpeech}:{" " + meaning.definitions[0].definition}
          </p>
        ))
      ) : (
        <p>Loading definition...</p>
      )}
    </>
  );
}
