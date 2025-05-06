import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import CalculatorForm from "../components/CalculatorForm";
import AmortizationTable from "../components/AmortizationTable";

export default function Home() {
  const [params, setParams] = useState(null);
  const allowedCurrencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];
  const [selectedCurrency, setSelectedCurrency] = useState(
    process.env.REACT_APP_BASE_CURRENCY || "USD"
  );

  const handleCalculate = (data) => {
    setParams(data);
    setSelectedCurrency(data.currency);
  };

  const handleReset = () => {
    setParams(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <CalculatorForm onCalculate={handleCalculate} />

      {params && (
        <>
          {/* Currency selector + Reset */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={selectedCurrency}
                label="Currency"
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {allowedCurrencies.map((code) =>
                  params.rates[code] ? (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  ) : null
                )}
              </Select>
            </FormControl>

            <Button variant="outlined" onClick={handleReset}>
              RESET TABLE
            </Button>
          </Box>

          <AmortizationTable
            principal={+params.principal}
            rate={+params.rate}
            tenure={+params.tenure}
            emi={params.emi}
            rates={params.rates}
            currency={selectedCurrency}
          />
        </>
      )}
    </Container>
  );
}
