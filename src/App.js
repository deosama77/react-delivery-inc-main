import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Customer from "./pages/Customer";
import Package from "./pages/Package";
import Invoice from "./pages/Invoices";
import Header from "./components/Header";
import ExerciseInvoice from "./pages/ExerciseInvoice";



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/customers">
            <Customer/>
          </Route>
          <Route path="/packages">
            <Package />
          </Route>
          <Route path="/invoices">
            <Invoice />
          </Route>
          <Route path="/exercise-invoice/:customerId">
            <ExerciseInvoice />
          </Route>
          <Route path="/">
            <Customer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
