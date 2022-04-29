/**
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
// import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function FormSearch() {
  return (
    <MKBox component="section" py={4} coloredShadow="dark">
      <Container>
        <Grid container item justifyContent="left" xs={12} lg={10} mx="auto" textAlign="left">
          <MKTypography variant="h4" mb={1}>
            Reserve A Car
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={10} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autocomplete="off">
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MKInput variant="standard" label="Pick-up" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MKInput variant="standard" label="Drop-off" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MKInput variant="standard" label="Pick-up date" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MKInput variant="standard" label="Drop-off date" fullWidth />
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
        <Grid container item justifyContent="center" lg={2} sx={{ mx: "auto" }}>
          <MKButton type="submit" variant="gradient" color="dark" fullWidth href={"/trip"}>
            Search
          </MKButton>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FormSearch;
