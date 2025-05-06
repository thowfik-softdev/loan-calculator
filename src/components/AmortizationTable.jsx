import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default function AmortizationTable({
  principal,
  rate,
  tenure,
  emi,
  rates,
  currency
}) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const months = tenure * 12;
    const monthlyRate = rate / 12 / 100;
    let balance = principal;
    const data = [];
    for (let m = 1; m <= months; m++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      data.push({ month: m, principal: principalPaid, interest, balance });
    }
    setSchedule(data);
  }, [principal, rate, tenure, emi]);

  const factor = rates[currency] || 1;

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ height: 500, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal ({currency})</TableCell>
              <TableCell>Interest ({currency})</TableCell>
              <TableCell>Balance ({currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{(row.principal * factor).toFixed(2)}</TableCell>
                <TableCell>{(row.interest * factor).toFixed(2)}</TableCell>
                <TableCell>{(row.balance * factor).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
