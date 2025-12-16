// components
import UniqueVisitorCard from "@/pages/dashboard/UniqueDashboard";

// style
import styles from "@/pages/dashboard/Dashboard.module.css";

// MUI components
import { Container } from "@mui/material";

export default function Dashboard() {
  return (
    <Container
    className={styles.mainContainer}
      maxWidth="lg"
    >
      <UniqueVisitorCard />
    </Container>
  );
}
