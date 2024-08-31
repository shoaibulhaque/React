import "./index.css";
import Header from "./components/Header";
import { createContext, useState } from "react";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Footer from "./components/Footer";

export const loginContext = createContext(); // Created a context

function App() {
  // check localStorage for an access token --> may be expired
  // const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  // long term goal --> use refresh token and if it works, stay logged in, otherwise, send to login page
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <loginContext.Provider value={[loggedIn, changeLoggedIn]}>
      {/* Wrapped it around diff, so can be accessible */}
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
          <Footer />
        </div>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
