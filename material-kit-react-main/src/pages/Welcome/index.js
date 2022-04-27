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

// Material Kit 2 React navigation <- examples
import DefaultNavbar from "navigation/Navbars/DefaultNavbar";
import SimpleFooter from "navigation/Footer";
// import FilledInfoCard from "navigation/Cards/InfoCards/FilledInfoCard";

// Welcome page sections <- Presentation
import Counters from "pages/Welcome/sections/Counters";
import FeatureCarList from "pages/Welcome/sections/FeatureCarList";

// Welcome page components
// TODO: ads!
import AdsDisplay from "pages/Welcome/components/AdsDisplay";

// TODO: put it where? Search form
import FormSearch from "layouts/sections/input-areas/forms/components/FormSearch";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-welcome.jpg";

function Welcome() {
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
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
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              ZZZ Car Rental{" "}
            </MKTypography>
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
        {/* TODO: filling form */}
        <Container>
          <FormSearch />
        </Container>
        <Counters />
        <FeatureCarList />
        <AdsDisplay />
      </Card>
      <MKBox pt={0} pb={4} px={1} mt={6}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default Welcome;
