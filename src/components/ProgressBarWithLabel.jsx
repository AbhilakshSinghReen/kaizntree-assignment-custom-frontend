import { Box, LinearProgress } from "@mui/material";

export default function ProgressBarWithLabel({ progressPercentage, label }) {
  return (
    <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <p>
        <strong>{label}</strong>
      </p>
      <LinearProgress
        sx={{ marginLeft: 20, marginRight: 20, flexGrow: 1 }}
        color="error"
        variant="determinate"
        value={progressPercentage}
      />
      <p>
        <strong>{`${progressPercentage.toFixed(2)} %`}</strong>
      </p>
    </Box>
  );
}
