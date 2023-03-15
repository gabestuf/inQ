import { Box, Container, Grid, Icon, Link, Paper, Typography } from "@mui/material";
import { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#302e35",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h5">
              inQ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="lightgrey" variant="subtitle1">
              {`${new Date().getFullYear()} | `}{" "}
              <Link href="https://github.com/gabestuf/inQ">
                Github <GitHubIcon fontSize="small" sx={{ transform: "translateY(.2rem)" }} />
              </Link>{" "}
              {" | "}
              <Link href="https://gabecamacho.com">The Creator </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
