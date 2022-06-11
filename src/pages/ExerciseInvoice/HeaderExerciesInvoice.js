import React from 'react';

function HeaderExerciesInvoice({invoice}) {
    return (
        <div className="Header">
        <div className="Header_Left">
          <div className="Item">2/4/2029</div>
          <div className="Item">{invoice?.customer?.name}</div>
        </div>
        <div className="Header_right">
          <div className="Item">Invoice</div>
          <div className="Item">NO.generatedId</div>
        </div>
      </div>
    );
}

export default HeaderExerciesInvoice;