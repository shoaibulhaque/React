import { useState } from "react";
import Button from "react-bootstrap/Button";
import { propTypes } from "react-bootstrap/esm/Image";
import Modal from "react-bootstrap/Modal";

export function AddCustomer(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="block mx-auto m-[10px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded"
      >
        + Add Customer
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Used the pre build tailwind inline form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setIndustry("");
              props.newCustomer(name, industry);
            }}
            id="editmodal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Customer Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  placeholder="Intel"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  placeholder="Chip"
                  type="text"
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded"
            form="editmodal"
            onClick={handleClose}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
