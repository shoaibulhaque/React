import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");

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

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord1(e.target.value);
        }}
      />
      <h2>Let's get the definition for {word1}</h2>

      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>Let's get the definition for {word2}</h2>
    </>
  );
}
