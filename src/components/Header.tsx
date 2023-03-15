import { Box, Container, Grid, Icon, Link, Paper, Typography } from "@mui/material";
import { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        outline: "solid thin #302e35",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography color="#302e35" variant="h2" sx={{ fontWeight: "bold" }}>
              <Link href="/" sx={{ textDecoration: "none" }}>
                inQ
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
