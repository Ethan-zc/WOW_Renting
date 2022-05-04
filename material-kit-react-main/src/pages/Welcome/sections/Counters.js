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
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React view
import DefaultCounterCard from "sections/Cards/CounterCards/DefaultCounterCard";

// TODO: counters info?
function Counters() {
  return (
    <MKBox component="section" py={1}>
      <Container>
        <Grid container item xs={12} md={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={3}
              suffix="+"
              title="Customers"
              description="Favorite website among international customers"
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
            <DefaultCounterCard
              count={20}
              suffix="+"
              title="Rental Cars"
              description="All kinds of vehicle that you can imagine"
            />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard count={0} title="Worry" description="No worries" />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
