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
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React view
import DefaultNavbar from "layouts/NavbarsUnauth/DefaultNavbar";
import BasicFooter from "layouts/Footers/BasicFooter";

// Trip page sections
import SearchCars from "pages/trip/sections/SearchCars";

// Images
import bgImage from "assets/images/bg-welcome.jpg";

function Trip() {
  return (
    <>
      <DefaultNavbar sticky />
      <MKBox
        minHeight="70vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={12} justifycontent="center" mx="auto">
            <Grid item xs={12} sm={12} md={12}>
              <MKTypography
                variant="h1"
                color="white"
                textAlign="center"
                mt={-6}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                ZZZ Car Rental
              </MKTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <MKTypography
                variant="body1"
                color="white"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
              >
                Welcome to NYC!
              </MKTypography>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <SearchCars />
        </Container>
      </Card>
      <MKBox pt={0} pb={4} px={1} mt={6}>
        <BasicFooter />
      </MKBox>
    </>
  );
}

export default Trip;
