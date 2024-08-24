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

  return (
    <div className="m-4 text-center flex flex-col justify-center items-center">
      <div>
        {notFound ? <NotFound id={id} /> : null}
        {customer ? (
          <div>
            <p>
              <b>ID:</b> {customer.id}
            </p>
            <p>
              <b>Name:</b> {customer.name}
            </p>
            <p>
              <b>Industry:</b> {customer.industry}
            </p>
          </div>
        ) : null}
      </div>
      <div>
        <Link to="/customers">Go Back</Link>
      </div>
    </div>
  );
}
