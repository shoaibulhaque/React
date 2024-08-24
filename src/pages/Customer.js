import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";

export default function Customer() {
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const navigate = useNavigate();
  const { id } = useParams(); // or we can write const id = useParams().id as useParams returns an object

  useEffect(() => {
    const url = baseURL + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          // redirect to a 404 page ( new URL )
          // navigate("/404");
          // render a 404 component in this page
          setNotFound(true);
        }

        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []); // Leaving dependency array empty which will make hit execute this function once

  function deleteCustomer() {
    console.log("deleting");
  }

  return (
    <div className="m-4 text-center flex flex-col justify-center items-center">
      <div>
        {notFound ? <NotFound id={id} /> : null}
        {customer ? (
          <table class="mb-3 w-full border-collapse border-1 border-gray-400 shadow-sm">
            <tbody>
              <tr>
                <td class="border-1 border-gray-400 px-4 py-2">ID</td>
                <td class="border-1 border-gray-400 px-4 py-2">
                  {customer.id}
                </td>
              </tr>
              <tr>
                <td class="border-1 border-gray-400 px-4 py-2">Name</td>
                <td class="border-1 border-gray-400 px-4 py-2">
                  {customer.name}
                </td>
              </tr>
              <tr>
                <td class="border-1 border-gray-400 px-4 py-2">Industry</td>
                <td class="border-1 border-gray-400 px-4 py-2">
                  {customer.industry}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>

      <div className="flex gap-2">
        <div>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded"
            onClick={deleteCustomer}
          >
            Delete
          </button>
        </div>

        <div className="py-[0.45rem] px-3">
          <Link
            className="no-underline text-gray-600 font-bold"
            to="/customers"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
