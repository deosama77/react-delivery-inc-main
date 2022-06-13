import {React,createContext, useState, useEffect} from 'react';
import { getInvoices } from "../Functions";

export const Appcontext=createContext();

function MyProvider({children}) {
    const [appData,setAppData]=useState([]);
    const [invoices, setInvoices] = useState([]);
    
    useEffect(() => {
        fetch("/data.json")
          .then((response) => response.json())
          .then((data) => {
            const newPakcges = data.packages.map((p) => ({
                ...p,
                customer: data.customers.find((c) => c.id === p.customerid),
              })).sort((a,b)=>a.shippingOrder-b.shippingOrder);
            const groupCustomers=  getInvoices(data);
            setAppData({customers:data.customers, packages:newPakcges });
            setInvoices(groupCustomers)
             
          });
      }, [setAppData , setInvoices]);

      const onDeleteCustomer = (id) => {
        let newCustomers = [];
        let newPackages =[]
        if (id) {
          newCustomers = appData.customers.filter((c) => c.id !== id);
          newPackages =appData.packages.filter((p) => p.customerid !== id)
          setAppData({ ...appData, customers: newCustomers , packages :newPackages });
          const groupCustomers=  getInvoices({ ...appData, customers: newCustomers , packages :newPackages });
          setInvoices(groupCustomers);
          // it is possible to delete from data.json but for testing I will keep it
        }
      };

      const handleOrderPackages=(option , id)=>{
        const currentPackage=appData.packages.find(p=>p.id===id)
        const copycurrentPackage={...currentPackage};

        if(option==="UP"){
          const smallerarray= appData.packages.filter(p=>p.shippingOrder<copycurrentPackage.shippingOrder)
         if(smallerarray.length>0){
           const targetPackage={...smallerarray[smallerarray.length-1]}
           currentPackage.shippingOrder=targetPackage.shippingOrder;
           targetPackage.shippingOrder=copycurrentPackage.shippingOrder;
              const filterPackages=appData.packages.filter(p=>p.id!==id&&p.id!==targetPackage.id);
              setAppData({ ...appData, packages: [...filterPackages,currentPackage,targetPackage].sort((a,b)=>a.shippingOrder-b.shippingOrder) });
         }
          }else{
            const heigherrarray= appData.packages.filter(p=>p.shippingOrder>copycurrentPackage.shippingOrder)
            if(heigherrarray.length>0){
              const targetPackage={...heigherrarray[0]}
              currentPackage.shippingOrder=targetPackage.shippingOrder;
              targetPackage.shippingOrder=copycurrentPackage.shippingOrder;
                 const filterPackages=appData.packages.filter(p=>p.id!==id&&p.id!==targetPackage.id);
                 setAppData({ ...appData, packages: [...filterPackages,currentPackage,targetPackage].sort((a,b)=>a.shippingOrder-b.shippingOrder) });
            }
          }
      }

      const handleDeltePackage = (id) => {
        const filteredPackages = appData.packages.filter((p) => p.id !== id);
        setAppData({ ...appData, packages: filteredPackages });
        const groupCustomers=  getInvoices({ ...appData, packages: filteredPackages });
        setInvoices(groupCustomers)
      };

      const addNewPackage=(packagesObject)=>{
        setAppData({
            ...appData,
            packages: [...appData.packages, packagesObject],
          });
          const groupCustomers=  getInvoices({
            ...appData,
            packages: [...appData.packages, packagesObject],
          });
          setInvoices(groupCustomers)
         
      }

    return (
        <Appcontext.Provider value={{appData,setAppData , onDeleteCustomer  , 
            handleOrderPackages , handleDeltePackage , addNewPackage , invoices , setInvoices}}>
        {children}</Appcontext.Provider>
    );
}


export default MyProvider;