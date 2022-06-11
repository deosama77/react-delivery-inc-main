import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddModalPackage from "./AddModalPackage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuShippingOrder from "./MenuShippingOrder";

function PackageList({ packages, customers, setAppData }) {
  const [uPackages, setUPackages] = useState(packages || {});
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const handleClickOpen = () => {
    setOpenAddModal(true);
  };

  const handleDelte = (id) => {
    const filteredPackages = packages.filter((p) => p.id !== id);
    setAppData({ customers: [...customers], packages: filteredPackages });
  };

  useEffect(() => {
    if (customers && packages) {
      const newPakcges = packages.map((p) => ({
        ...p,
        customer: customers.find((c) => c.id === p.customerid),
      }));
      setUPackages(newPakcges);
    }
  }, [setUPackages, packages, customers]);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOrder =(option)=>{
       if(option==="Order Up"){
         const reOrder=uPackages.sort((a,b)=>a.shippingOrder-b.shippingOrder);
         setUPackages(reOrder);
       }else{
        const reOrder=uPackages.sort((a,b)=>b.shippingOrder-a.shippingOrder);
        setUPackages(reOrder);
       }
       handleClose();
  }
  return (
    <>
      <AddModalPackage
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        setAppData={setAppData}
        customers={customers}
        packages={packages}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uPackages &&
              uPackages.map((row) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row?.customer?.name}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDelte(row.id)}
                      >
                        Delete
                      </Button>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <MenuShippingOrder
                      anchorEl={anchorEl}
                      open={open}
                      handleClose={handleClose}
                      handleClickOrder={handleClickOrder}
                    />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PackageList;
