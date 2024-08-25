import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";

/**
 * Customer component for displaying and managing customer details.
 * @returns {JSX.Element} The rendered Customer component.
 */
export default function Customer() {
  const [customer, setCustomer] = useState(null);
  const [tempCustomer, setTempCustomer] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  useEffect(() => {
    if (customer && tempCustomer) {
      setChanged(
        customer.name !== tempCustomer.name ||
          customer.industry !== tempCustomer.industry
      );
    }
  }, [tempCustomer]);

  /**
   * Fetches customer data from the API.
   */
  const fetchCustomer = async () => {
    try {
      const response = await fetch(`${baseURL}api/customers/${id}`);
      if (response.status === 404) {
        setNotFound(true);
        return;
      }
      const data = await response.json();
      setCustomer(data.customer);
      setTempCustomer(data.customer);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError("Failed to fetch customer data");
    }
  };

  /**
   * Updates the customer data in the API.
   */
  const updateCustomer = async () => {
    try {
      const response = await fetch(`${baseURL}api/customers/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempCustomer),
      });
      if (!response.ok) {
        throw new Error("Something went wrong during update!");
      }
      const data = await response.json();
      setCustomer(data.customer);
      setChanged(false);
      setError(null);
    } catch (error) {
      console.error("Error updating customer:", error);
      setError(error.message);
    }
  };

  /**
   * Deletes the customer from the API.
   */
  const deleteCustomer = async () => {
    try {
      const response = await fetch(`${baseURL}api/customers/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong during deletion!");
      }
      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError("Failed to delete customer");
    }
  };

  /**
   * Handles input change for customer fields.
   * @param {Object} e - The event object.
   * @param {string} field - The field being updated.
   */
  const handleInputChange = (e, field) => {
    setTempCustomer({ ...tempCustomer, [field]: e.target.value });
  };

  if (notFound) return <NotFound id={id} />;

  return (
    <div className="m-4 text-center flex flex-col justify-center items-center">
      {customer && (
        <div className="max-w-md mx-auto p-4">
          <CustomerField
            label="Name"
            value={tempCustomer.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <CustomerField
            label="Industry"
            value={tempCustomer.industry}
            onChange={(e) => handleInputChange(e, "industry")}
          />
        </div>
      )}

      <div className="flex gap-2 flex-col">
        {changed && (
          <div>
            <button
              onClick={updateCustomer}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setTempCustomer({ ...customer });
                setChanged(false);
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        )}

        {customer && (
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteCustomer}
          >
            Delete
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <Link
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded no-underline"
          to="/customers"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

/**
 * CustomerField component for rendering input fields.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {Function} props.onChange - The onChange handler for the input field.
 * @returns {JSX.Element} The rendered CustomerField component.
 */
function CustomerField({ label, value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="w-full sm:w-24 font-semibold mb-1 sm:mb-0">
        {label}:
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
