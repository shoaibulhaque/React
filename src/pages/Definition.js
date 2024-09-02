import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import useFetch from "../hooks/useFetch";

export default function Definition() {
  // const [word, setWord] = useState(undefined);
  let { search } = useParams();
  const show = "true";
  const navigate = useNavigate();

  // Using custom hook
  const [word, errorStatus] = useFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );

  // const [word1, setWord1] = useState("");
  // const [word2, setWord2] = useState("");

  /* It takes two arguments, second one is optional, first is a callback function
  Limit what state useEffect care about --> dependency array ( 2nd argument )
  It is better to define useEffect after state variables */

  // No dependency array --> update for any state change
  //   useEffect(() => {
  //     console.log("State Updated!", word1 + "" + word2);
  //   });

  // empty dependency array --> execute once, good for initial setup, fetching
  //   useEffect(() => {
  //     console.log("State Updated!", word1 + "" + word2);
  //   }, []);

  /* third, here it only dependes on word 1 ( so word 1 would have the updated value,
  but we are not sure about word2 ), in other words, in the following useEffect is not
  going to wait around for word2 */
  //   useEffect(() => {
  //     console.log("State updated !", word1 + "" + word2);
  //   }, [word1]);

  // useEffectCleanup - return a function

  // -------- Used Custom Hook for the following ----------
  // useEffect(() => {
  //   fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
  //     .then((response) => {
  //       if (response.status === 404) {
  //         setNotFound(true);
  //       }

  //       if (!response.ok) {
  //         setError(true);

  //         throw new Error("Something went wrong !");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setWord(data[0].meanings);
  //       console.log(data[0].meanings);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // }, []);

  // Handling 404 error
  if (errorStatus === 404) {
    return (
      <>
        <NotFound
          linkTo="/dictionary"
          linkText="Search Another"
          wordNotFound={true}
          show={show}
        />
      </>
    );
  }
  return (
    <>
      {word?.[0] ? (
        <>
          <h1 className="mt-4">Here is the definition</h1>
          {word[0].meanings.map((meaning) => (
            <p key={uuidv4()}>
              <b>{meaning.partOfSpeech}</b>:
              {" " + meaning.definitions[0].definition}
            </p>
          ))}
          <a href="/dictionary">Go Back and Search another word</a>
        </>
      ) : (
        <p>Loading definition...</p>
      )}
    </>
  );
}
