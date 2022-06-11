import React from 'react';
import Invoices from './Invoices';

function Invoice({invoices}) {
    return (
       <Invoices invoices={invoices}/>
    );
}

export default Invoice;