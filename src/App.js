import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("dev"); // we cannot change value directly, so we have used state
  const [employees, setEmployees] = useState([
    {
      name: "Shoaib",
      role: "Developer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Saqib",
      role: "Intern",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Faiz",
      role: "Developer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Abdullah",
      role: "Scientist",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Haris",
      role: "Engineer",
      img: "https://images.pexels.com/photos/974266/pexels-photo-974266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  const showEmployees = true;
  // let role = 'dev'
  return (
    <div className="App">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
              // role = e.target.value; // this does not work !
            }}
          />
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              return (
                <Employee
                  key={uuidv4()}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
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
