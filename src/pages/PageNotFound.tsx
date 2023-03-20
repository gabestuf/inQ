import { FC } from "react";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const PageNotFound: FC = () => {
  return (
    <Grid marginTop="3rem" minHeight="50vh" container spacing={0} direction="column" alignItems="center" justifyContent="center" gap="1rem">
      <Typography variant="h2">Error 404</Typography>
      <Typography variant="h4">{"Page not found :("}</Typography>
      <Link to={"/"}>Home Page</Link>
    </Grid>
  );
};

export default PageNotFound;
