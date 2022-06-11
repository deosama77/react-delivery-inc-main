import { Menu, MenuItem } from '@mui/material';
import React from 'react';

function MenuShippingOrder({
    anchorEl,
    open,
    handleClose,
    handleClickOrder
}) {
    const options = [
        'Order Up',
        'Order Down'
      ];
      const ITEM_HEIGHT = 48;
    return (
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleClickOrder(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    );
}

export default MenuShippingOrder;