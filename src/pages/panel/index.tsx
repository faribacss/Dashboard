// MUI components
import { Box, Grid } from "@mui/material";

// components
import Dashboard from "@/pages/dashboard";
import Navbar from "@/components/Navbar";

export default function Panel() {
  return (
    <>
    <Navbar />
      <Box sx={{margin: "20px"}}>
        <Grid>
          <Dashboard />
        </Grid>
      </Box>
    </>
  );
}
