import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    console.log("Fetching...");
    fetch(baseURL + "api/customers/") // consuming data from the backend
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []); // Added an empty dependency, so it does this once on inital load

  return (
    <>
      <h1>Here are our Customers! </h1>
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/customers/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}
