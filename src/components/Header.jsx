import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Switch
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { mode, toggle } = useAppContext();
  const location = useLocation();

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "EXCHANGE RATES (LIVE)", to: "/exchange" },
    { label: "ABOUT", to: "/about" },
    { label: "ERROR PAGE", to: "/error" }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title */}
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 500 }}
        >
          Loan Calculator
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Nav buttons + switch */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  textTransform: "none",
                  borderRadius: "5px",
                  px: 2,
                  py: 0.5,
                  // active pill style:
                  ...(isActive
                    ? { bgcolor: "common.white", color: "primary.main" }
                    : { color: "common.white" }),
                  "&:hover": isActive
                    ? { bgcolor: "grey.100" }
                    : { bgcolor: "rgba(255,255,255,0.2)" }
                }}
              >
                {item.label}
              </Button>
            );
          })}

          <Switch checked={mode === "dark"} onChange={toggle} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
