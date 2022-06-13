import { Menu, MenuItem } from "@mui/material";
import React from "react";

function MenuShippingOrder({
  isHeigher,
  isLowest,
  anchorEl,
  open,
  handleClose,
  handleClickOrder,

}) {
  // const options = ["Order Up", "Order Down"];
  const ITEM_HEIGHT = 20;
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "9ch",
          textAlign:'center'
        },
      }}
    >
      {!isLowest&&<MenuItem
    
        // selected={option === "Pyxis"}
        onClick={() => handleClickOrder("UP")}
      >
        UP
      </MenuItem>}
     {!isHeigher &&<MenuItem
     
        // selected={option === "Pyxis"}
        onClick={() => handleClickOrder("DWON")}
      >
        DOWN
      </MenuItem>}
    </Menu>
  );
}

export default MenuShippingOrder;
