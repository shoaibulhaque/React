import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');  // we cannot change value directly, so we have used state
  const showEmployees = true;
  // let role = 'dev' 
  return (
    <div className="App bg-red-300">
      {showEmployees ? (
      <>
        <input type='text' onChange={
          (e) => {
            console.log(e.target.value);
            setRole(e.target.value)
            // role = e.target.value; // this does not work !
          }}
          
        />
          <Employee name = "Shoaib" role = "Intern"/>
          <Employee name = "Saqib" role = {role} /> 
      </>
     ) : (
      <p> You can not see the Employees</p>
         )}
    </div>
  );
}

export default App;
