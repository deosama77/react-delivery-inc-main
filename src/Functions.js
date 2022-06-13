  //   get invoices from customers and packages
export const getInvoices = (data) => {
    const groupCustomers = data.customers.map((c) => {
    const customPackages = data.packages.filter((p) => p.customerid === c.id);
    if(customPackages.length<=0){
       return {...c};
    }
    const customPrice = customPackages.reduce((total, p) => total + p.price, 0);
    const customWeight = customPackages.reduce(
      (total, p) => total + Number(p.weight.slice(0, -2)),
      0);
    return {
      ...c,
      package: {
        price: customPrice,
        weight: customWeight + "kg",
      },
    };
  });
  return groupCustomers;
};

//  generate
 // Find the larger number of ids and generate one is greater than
export const generateShippingOrder = (packages) => {
  const shippingOrders = packages
    .map((p) => p.shippingOrder)
    .sort((a, b) => a - b);
  const shippingOrder = shippingOrders[shippingOrders.length - 1] + 1;
  return shippingOrder;
};

 // Find the larger number of ids and generate one is greater than
export const generateNewId = (packages) => {
  const ids = packages.map((p) => Number(p.id.slice(3))).sort((a, b) => a - b);
  const newId = ids[ids.length - 1] + 1;
  return newId;
};

export const getHeighestOrder=(packages)=>{
  const shippingOrders = packages
  .map((p) => p.shippingOrder)
  .sort((a, b) => a - b);
const shippingOrder = shippingOrders[shippingOrders.length - 1];
return shippingOrder;
}

export const getLowestOrder=(packages)=>{
  const shippingOrders = packages
  .map((p) => p.shippingOrder)
  .sort((a, b) => a - b);

const shippingOrder = shippingOrders[0];
return shippingOrder;
}