import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import "./ExerciesInvoice.css";
import FooterExercisesInvoice from "./FooterExercisesInvoice";
import HeaderExerciesInvoice from "./HeaderExerciesInvoice";
import InvoicesList from "./InvoicesList";
import {Appcontext} from '../../contexts/MyProvider';


function ExerciseInvoice(props) {
  let { customerId } = useParams();
  const {appData } = useContext(Appcontext);
  const [invoice, setInvoice] = useState({
    topPadding: 180,
    totalPrice: 0,
    totalWeight: 0,
  });
  useEffect(() => {
    if (customerId) {
      const customer = appData.customers.find(
        (c) => c.id.toString() === customerId.toString()
      );
      const packages = appData.packages.filter(
        (p) => p.customerid.toString() === customerId.toString()
      );

      const countPackages = packages.length;
          const topPadding = 180 - countPackages * 20;
          const totalP =
            packages.length > 0
              ? packages?.reduce((total, p) => total + p.price, 0)
              : 0;

          const totalW =
            packages.length > 0
              ? packages?.reduce(
                  (total, p) => total + Number(p.weight.slice(0, -2)),
                  0
                )
              : 0;
     

              setInvoice({
                customer,
                packages,
                countPackages,
                topPadding: topPadding > 0 ? topPadding : 0,
                totalPrice: totalP,
                totalWeight: totalW,
              })

    }
  }, [customerId , appData.customers , appData.packages]);
  return (
    <div className="Container">
      <HeaderExerciesInvoice invoice={invoice}></HeaderExerciesInvoice>
      <InvoicesList invoice={invoice}></InvoicesList>
      <FooterExercisesInvoice invoice={invoice}></FooterExercisesInvoice>
    </div>
  );
}

export default ExerciseInvoice;
