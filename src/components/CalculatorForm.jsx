import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import useEMICalculator from "../hooks/useEMICalculator";
import { fetchExchangeRates } from "../api/exchangeRate";

export default function CalculatorForm({ onCalculate }) {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(
    process.env.REACT_APP_BASE_CURRENCY || "USD"
  );

  // EMI in base‐currency per month
  const emi = useEMICalculator(+principal, +rate, +tenure * 12);

  // fetch live rates once
  useEffect(() => {
    fetchExchangeRates()
      .then((data) => {
        setRates(data);
        onCalculate({ principal, rate, tenure, emi, rates: data, currency });
      })
      .catch(console.error);
  }, []);

  // re-fire calculate when inputs change
  useEffect(() => {
    if (Object.keys(rates).length) {
      onCalculate({ principal, rate, tenure, emi, rates, currency });
    }
  }, [principal, rate, tenure, emi, currency, rates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ principal, rate, tenure, emi, rates, currency });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Term (Years)"
            type="number"
            fullWidth
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: "100%" }}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>

      {/*       {emi > 0 && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Monthly EMI ({process.env.REACT_APP_BASE_CURRENCY}): {emi.toFixed(2)}
        </Typography>
      )} */}
    </Box>
  );
}
