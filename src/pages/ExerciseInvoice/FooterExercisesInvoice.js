import React from 'react';

function FooterExercisesInvoice({invoice}) {
    return (
        <div className="Footer">
        <div className="Item">You received {invoice?.countPackages||0} packages</div>
       <div className="Item">Thank you for using our services</div>
     </div>
    );
}

export default FooterExercisesInvoice;