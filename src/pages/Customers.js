import { useEffect } from "react";

export default function Customers() {
  useEffect(() => {
    console.log("Fetching...");
  });

  return <h1>Hello there!</h1>;
}
