import React from 'react';

function InvoicesList({invoice}) {
    return (
        <div className="Invoices">
        <div className="Invoice_Header">
          <div className="Invoice_Header_Id">ID</div>
          <div className="Invoice_Header_Weight">Weight</div>
          <div className="Invoice_Header_Price">Price</div>
        </div>

        <div className="Invoice_Content">
          {invoice &&
            invoice.packages &&
            invoice.packages.map((p, i) => (
              <div className="Invoice_Content_Row" key={p.id + i}>
                <div className="Invoice_Content_Id">{p.id}</div>
                <div className="Invoice_Content_Weight">{p.weight}</div>
                <div className="Invoice_Content_Price_Row">{p.price}</div>
              </div>
            ))}

          <div className="Invoice_Content_Row">
            <div className="Invoice_Content_Id_Total_Row"></div>
            <div
              className="Invoice_Content_Weight_Total_Row"
              style={{
                paddingTop:
                  invoice.topPadding && invoice.topPadding > 0
                    ? invoice.topPadding
                    : 0,
              }}
            >
              {invoice.totalWeight} kg
            </div>
            <div
              className="Invoice_Content_Price_Total_Row"
              style={{
                paddingTop:
                  invoice.topPadding && invoice.topPadding > 0
                    ? invoice.topPadding
                    : 0,
              }}
            >
              Total : {invoice.totalPrice}
            </div>
          </div>
        </div>
      </div>
    );
}

export default InvoicesList;