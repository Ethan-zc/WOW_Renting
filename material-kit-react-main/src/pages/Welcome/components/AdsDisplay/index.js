/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function BuiltByDevelopers() {
  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg";

  return (
    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      py={6}
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8)
          )}, url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Grid container item xs={12} lg={12} sx={{ ml: { xs: 12, lg: 6 } }}>
          <Grid item xs={12} sm={12} md={12}>
            <MKTypography variant="h4" color="white" fontWeight="bold">
              Built by developersCall For Ads!
            </MKTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <MKTypography variant="h1" color="white" mb={1}>
              Call For Ads!
            </MKTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <MKTypography variant="body1" color="white" opacity={0.8} mb={1}>
              We deliver the best car rental service. Appreciate your investment!
            </MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default BuiltByDevelopers;
