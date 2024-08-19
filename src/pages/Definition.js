import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";

export default function Definition() {
  const [word, setWord] = useState(undefined);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  let { search } = useParams();
  const show = "visible";
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }

        if (!response.ok) {
          setError(true);

          throw new Error("Something went wrong !");
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data[0].meanings);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  // Handling 404 error
  if (notFound === true) {
    return (
      <>
        <NotFound linkTo="/dictionary" linkText="Search Another" show={show} />
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is the definition</h1>
          {word.map((meaning) => (
            <p key={uuidv4()}>
              <b>{meaning.partOfSpeech}</b>:
              {" " + meaning.definitions[0].definition}
            </p>
          ))}
        </>
      ) : (
        <p>Loading definition...</p>
      )}
    </>
  );
}
