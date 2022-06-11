import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { generateNewId, generateShippingOrder } from "../../Functions";

function AddModalPackage({
  openAddModal,
  setOpenAddModal,
  setAppData,
  customers,
  packages,
}) {
  const [customer, setCustomer] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpenAddModal(false);
    setError("");
    setWeight("");
    setPrice("");
    setCustomer("")
  };

  const handleSubmit = () => {
      if(!customer){
          setError("Customer is required !")
          return;
      }
      if(!weight||!Number(weight)){
        setError("Weight is required as number!")
        return;
    }
    if(!price||!Number(price)){
        setError("Price is required as number!")
        return;
    }
    const newId = generateNewId(packages);
    //  generate shipping order
    const shippingOrder = generateShippingOrder(packages);

    const packagesObject = {
      id: "pak" + newId,
      weight: weight + "kg",
      customerid: Number(customer),
      price: Number(price),
      shippingOrder: shippingOrder,
    };
    setAppData({
      customers: [...customers],
      packages: [...packages, packagesObject],
    });
 
    handleClose();
  
  };

  return (
    <Dialog open={openAddModal} onClose={handleClose}>
      <DialogContent>
        <DialogContentText style={{ minWidth: 400, textAlign: "center" }}>
          Add new Package
          <span className="Error">{error ? error :""}</span>
        </DialogContentText>
        <Box className="formGroupPackage">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Customer
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              label="Customer"
            >{customers &&
                customers.map((c,i) => (
                  <MenuItem value={c.id} key={c.id+i}>{c.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
         
            margin="dense"
            id="weight"
            label="ًWeight"
            type="text"
            variant="standard"
            style={{ minWidth: 300 }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <TextField
            
            margin="dense"
            id="price"
            label="Price"
            type="text"
            variant="standard"
            style={{ minWidth: 300 }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModalPackage;
