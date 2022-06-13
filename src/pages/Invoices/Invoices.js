import React, { useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Appcontext } from "../../contexts/MyProvider";

function Invoices() {
  const { invoices } = useContext(Appcontext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Weight</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices &&
            invoices.map((row, i) => {
              if(row.package){
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={row.id + i}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.package?.weight}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.package?.price}
                    </TableCell>
                  </TableRow>
                );
                
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Invoices;
