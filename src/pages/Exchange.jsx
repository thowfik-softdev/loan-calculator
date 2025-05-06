import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination
} from "@mui/material";
import { fetchExchangeRates } from "../api/exchangeRate";

export default function Exchange() {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  // pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchExchangeRates()
      .then(setRates)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!rates) return <Typography>Loading live exchange rates…</Typography>;

  // turn object into array so we can slice
  const entries = Object.entries(rates);

  // handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates (Base: {process.env.REACT_APP_BASE_CURRENCY})
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([code, rate], index) => (
                <TableRow key={code}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{code}</TableCell>
                  <TableCell align="right">{rate.toFixed(4)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={entries.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Container>
  );
}
