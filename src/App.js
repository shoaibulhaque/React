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

function App() {
  return (
    <BrowserRouter>
      <Header>
        {/* As now we have header surrounding different components we dont have to p
    put in each and every component */}

        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          {/* parameterized route */}
          <Route path="/dictionary/:search" element={<Definition />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound show="visually-hidden" />} />
        </Routes>
        {/* <Employees /> */}
      </Header>
    </BrowserRouter>
  );
}

export default App;
