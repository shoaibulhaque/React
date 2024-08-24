import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";

/**
 * Component that displays detailed information about a customer.
 * If the customer is not found, it renders a "NotFound" component.
 */
export default function Customer() {
  const [customer, setCustomer] = useState(null); // State to hold the customer data
  const [notFound, setNotFound] = useState(false); // State to track if customer is not found
  const navigate = useNavigate();
  const { id } = useParams(); // Get the customer ID from the URL parameters

  /**
   * useEffect hook to fetch customer data from the API when the component mounts.
   * It checks if the customer exists and sets the appropriate state.
   */
  useEffect(() => {
    const url = `${baseURL}api/customers/${id}`; // Construct the API URL

    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true); // Set notFound state to true if customer is not found
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setCustomer(data.customer); // Set the customer state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]); // Dependency array includes `id` to re-run effect when `id` changes

  return (
    <div className="m-4 text-center flex flex-col justify-center items-center">
      {/* Render NotFound component if customer is not found */}
      {notFound ? <NotFound id={id} /> : null}

      {/* Render customer details if customer data is available */}
      {customer && (
        <table className="mb-3 w-full border-collapse border-1 border-gray-600 shadow-sm">
          <tbody>
            <tr>
              <td className="border-1 border-gray-400 px-4 py-2">ID</td>
              <td className="border-1 border-gray-400 px-4 py-2">
                {customer.id}
              </td>
            </tr>
            <tr>
              <td className="border-1 border-gray-400 px-4 py-2">Name</td>
              <td className="border-1 border-gray-400 px-4 py-2">
                {customer.name}
              </td>
            </tr>
            <tr>
              <td className="border-1 border-gray-400 px-4 py-2">Industry</td>
              <td className="border-1 border-gray-400 px-4 py-2">
                {customer.industry}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Buttons for deleting the customer and navigating back */}
      <div className="flex gap-2">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded"
          onClick={() => {
            const url = `${baseURL}/api/customers/${id}`;
            fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Something went wrong during deletion!");
                }
                navigate("/customers"); // Redirect to customers list after deletion
              })
              .catch((error) => {
                console.error("Error deleting customer:", error);
              });
          }}
        >
          Delete
        </button>

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
