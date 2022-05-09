/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Kit 2 React view
import DefaultNavbar from "sections/Navbars/DefaultNavbar";
import AuthFooter from "sections/Footers/AuthFooter";

// Authentication components
import PageLayout from "pages/authentication/components/PageLayout";

import unauthNavRoutes from "routes/unauth.nav.routes";

export default function SignUpLayout({ image, children }) {
  return (
    <PageLayout>
      <DefaultNavbar 
        light
        transparent
        routes={unauthNavRoutes}
      />
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={0} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={9} lg={9} xl={9}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <AuthFooter light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
SignUpLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};