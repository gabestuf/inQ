import { Box, Container, Grid, Icon, Link, Paper, Typography } from "@mui/material";
import { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        borderBottom: "solid thin #302e35",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container>
        <Grid container direction="row" sx={{ justifyContent: "space-between" }}>
          <Grid item xs={1} sm={3}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              <Link href="/" sx={{ textDecoration: "none" }}>
                inQ
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={9} display="flex" flexDirection="row" justifyContent="flex-end" gap="5rem" alignItems="flex-end">
            <Typography variant="overline" sx={{ fontWeight: "bold" }}>
              <Link href="/findsurvey" sx={{ textDecoration: "none" }}>
                Find Surveys
              </Link>
            </Typography>
            <Typography variant="overline" sx={{ fontWeight: "bold" }}>
              <Link href="https://gabecamacho.com" sx={{ textDecoration: "none" }}>
                GabeCamacho.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
