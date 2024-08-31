import { useEffect, useState, useContext } from "react";
import { json, Link, useNavigate, useLocation } from "react-router-dom";
import { baseURL } from "../shared";
import { AddCustomer } from "../components/AddCustomer";
import { loginContext } from "../App";

export default function Customers() {
  const [loggedIn, setLoggedIn] = useContext(loginContext);
  const [customers, setCustomers] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(baseURL + "api/customers/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }) // consuming data from the backend
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname, // current location would be send as state to
              // login page
            },
          });
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []); // Added an empty dependency, so it does this once on inital load

  function newCustomer(name, industry) {
    const data = {
      name: name,
      industry: industry,
    };
    const url = baseURL + "/api/customers/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        // assume the add was successful
        // make sure the list is updated
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <h1 className="text-[1.45rem] sm:text-3xl font-extrabold text-center text-gray-800 mt-3 mb-6">
        Here are our Customers!
      </h1>
      <ul className="space-y-4 w-full px-0">
        {customers
          ? customers.map((customer) => {
              return (
                <li
                  key={customer.id}
                  className="shadow-md bg-gray-100 rounded-lg p-4 hover:bg-gray-50 transition duration-200"
                >
                  <Link
                    to={"/customers/" + customer.id}
                    className="no-underline text-lg font-semibold text-gray-500 hover:text-gray-900"
                  >
                    {customer.name}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
      <div className="mt-8">
        <AddCustomer newCustomer={newCustomer} />
      </div>
    </div>
  );
}
