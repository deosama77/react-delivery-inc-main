import React, { useContext, useState } from "react";

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
import {Appcontext} from '../../contexts/MyProvider';
import { getHeighestOrder, getLowestOrder } from "../../Functions";

function PackageList() {
  const {appData , handleOrderPackages , handleDeltePackage} =useContext(Appcontext);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [id,setId]=useState(0);
  const [isH,setIsH]=useState(false);
  const [isL,setIsL]=useState(false);
  

  const handleClickOpen = () => {
    setOpenAddModal(true);
  };


  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
  const h=  getHeighestOrder(appData.packages);
  const l= getLowestOrder(appData.packages);
  const currentp=appData.packages.find(p=>p.id===id)
  setIsH(currentp.shippingOrder ===h ? true:false);
  setIsL(currentp.shippingOrder ===l ? true:false)
  setId(id)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOrder =(option)=>{
      handleOrderPackages(option,id);
       handleClose();
  }
  return (
    <>
      <AddModalPackage
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      
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
            {appData.packages &&
              appData.packages.map((row,i) => {
                
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={row.id+i}
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
                        onClick={() => handleDeltePackage(row.id)}
                      >
                        Delete
                      </Button>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e)=>handleClick(e,row.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <MenuShippingOrder
                      isHeigher={isH}
                      isLowest={isL}
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
