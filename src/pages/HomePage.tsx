import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const HomePage: FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h3">Any Questions?</Typography>
      <Divider />
      <Typography variant="subtitle1">Good, cause now you can answer them. </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={6} xl={6} marginTop="0px">
          <Box sx={{ padding: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5">Start today!</Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                navigate("/survey");
              }}
            >
              Create a survey.
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
          <Box sx={{ padding: "5rem" }}>
            <Typography variant="h5">How it works.</Typography>
            <Typography variant="body1">
              Everybody's got questions. Now you can get some answers. <br />
              InQ lets you design your own surveys so people you trust (or dont trust) can answer them. Maybe someone has already answered your question. Search for it! See what kind of data they've collected. Sending out a survey is as easy as distributing a link to whoever you want to answer it.
              Or, if you only want certain people to input responses, add a password!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
