import './App.css';
import Employee from './components/Employee';

function App() {
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
      <>
          <Employee name = "Shoaib" role = "Intern"/>
          <Employee name = "Saqib" /> 
      </>
     ) : (
      <p> You can not see the Employees</p>
         )}
    </div>
  );
}

export default App;
