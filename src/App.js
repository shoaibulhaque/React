import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("dev"); // we cannot change value directly, so we have used state
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Shoaib",
      role: "Developer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Saqib",
      role: "Intern",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "Faiz",
      role: "Developer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Abdullah",
      role: "Scientist",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      name: "Haris",
      role: "Engineer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map(
      (employee) =>
        employee.id === id
          ? { ...employee, name: newName, role: newRole }
          : employee
      // Or you can do using if else
      // if (employee.id === id) {
      //   return { ...employee, name: newName, role: newRole };
      // }
      // return employee;
    );
    setEmployees(updatedEmployees);
  }

  const showEmployees = true;
  // let role = 'dev'
  return (
    <div className="App">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              setRole(e.target.value);
              // role = e.target.value; // this does not work !
            }}
          />
          <div className="flex flex-wrap justify-center">
            {/* Map is a function on an array that allow us to go through each element
            and execute a function for each one */}
            {employees.map((employee) => {
              return (
                <Employee
                  key={uuidv4()}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p> You can not see the Employees</p>
      )}
    </div>
  );
}

export default App;
