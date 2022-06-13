import React, { useContext, useState } from "react";
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
import { Appcontext } from "../../contexts/MyProvider";

function AddModalPackage({ openAddModal, setOpenAddModal }) {
  const { appData, addNewPackage } = useContext(Appcontext);
  const [customer, setCustomer] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const [customerError, setCustomerError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleClose = () => {
    setOpenAddModal(false);

    setWeight("");
    setPrice("");
    setCustomer("");
    setWeightError(false);
    setPriceError(false);
    setCustomerError(false);
  };

  const handleSubmit = () => {
    if (!customer) {
      // "Customer is required !"
      setCustomerError(true);

      return;
    } else {
      setCustomerError(false);
    }
    if (!weight || !Number(weight)) {
      // "Weight is required as number!"
      setWeightError(true);

      return;
    } else {
      setWeightError(false);
    }
    if (!price || !Number(price)) {
      setPriceError(true);

      return;
    } else {
      setPriceError(false);
    }

    const newId = generateNewId(appData.packages);
    //  generate shipping order
    const shippingOrder = generateShippingOrder(appData.packages);

    const packagesObject = {
      id: "pak" + newId,
      weight: weight + "kg",
      customerid: Number(customer),
      price: Number(price),
      shippingOrder: shippingOrder,
      customer: appData.customers.find((c) => c.id === customer),
    };
    addNewPackage(packagesObject);
    handleClose();
  };

  return (
    <Dialog open={openAddModal} onClose={handleClose}>
      <DialogContent>
        <DialogContentText style={{ minWidth: 400, textAlign: "center" }}>
          Add new Package
            <span className="Error">{(customerError || weightError || priceError)&&"Error !!!"}</span>
        </DialogContentText>
        <Box className="formGroupPackage">
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 300 }}
            error={customerError}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Customer
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
                if (customer) {
                  setCustomerError(false);
                }
              }}
              label="Customer"
            >
              {appData.customers &&
                appData.customers.map((c, i) => (
                  <MenuItem value={c.id} key={c.id + i}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            error={weightError}
            margin="dense"
            id="weight"
            label="ًWeight"
            type="text"
            variant="standard"
            style={{ minWidth: 300 }}
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              if (weight && Number(weight)) {
                setWeightError(false);
              }
            }}
            helperText="Weight is required as number"
          />

          <TextField
            error={priceError}
            margin="dense"
            id="price"
            label="Price"
            type="text"
            variant="standard"
            style={{ minWidth: 300 }}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (price && Number(price)) {
                setPriceError(false);
              }
            }}
            helperText="Price is required as number"
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
