import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Customer from "./pages/Customer";
import Package from "./pages/Package";
import Invoice from "./pages/Invoices";
import Header from "./components/Header";
import ExerciseInvoice from "./pages/ExerciseInvoice";
import { getInvoices } from "./Functions";

function App() {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);

  const onDeleteCustomer = (id) => {
    let newCustomers = [];
    if (id) {
      newCustomers = appData.customers.filter((c) => c.id !== id);
      setAppData({ ...appData, customers: newCustomers });

      // it is possible to delete from data.json but for testing I will keep it
    }
  };
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const groupCustomers=  getInvoices(data);
        setAppData({customers:data.customers, packages:data.packages });
        setInvoices(groupCustomers)
         
      });
  }, [setAppData]);
  

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/customers">
            <Customer
              customers={appData.customers}
              onDelete={onDeleteCustomer}
            />
          </Route>
          <Route path="/packages">
            <Package 
            packages={appData.packages} 
            customers={appData.customers} 
            setAppData={setAppData}
            />
          </Route>
          <Route path="/invoices">
            <Invoice invoices={invoices} />
          </Route>
          <Route path="/exercise-invoice/:customerId">
            <ExerciseInvoice />
          </Route>
          <Route path="/">
            <Customer customers={appData.customers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
