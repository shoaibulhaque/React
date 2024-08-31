import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        {/* Added this wrapper div with font-sans class */}
        <Header>
          {/* As now we have header surrounding different components we dont have to p
          ut in each and every component */}

          {/* Defining routes */}
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/dictionary" element={<Dictionary />} />
            {/* parameterized route */}
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound show="visually-hidden" />} />
          </Routes>
          {/* <Employees /> */}
        </Header>
      </div>
    </BrowserRouter>
  );
}

export default App;
