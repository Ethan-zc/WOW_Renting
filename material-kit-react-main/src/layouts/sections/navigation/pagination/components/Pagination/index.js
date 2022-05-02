/* eslint-disable no-param-reassign */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDPagination from "components/MDPagination";

function Pagination() {
  return (
    <Container sx={{ height: "100%" }}>
      <Grid container item justifyContent="center" xs={12} lg={6} mx="auto" height="100%">
        <MDPagination>
          <MDPagination item>
            <Icon>keyboard_arrow_left</Icon>
          </MDPagination>
          <MDPagination item active>
            1
          </MDPagination>
          <MDPagination item>2</MDPagination>
          <MDPagination item>3</MDPagination>
          <MDPagination item>4</MDPagination>
          <MDPagination item>5</MDPagination>
          <MDPagination item>
            <Icon>keyboard_arrow_right</Icon>
          </MDPagination>
        </MDPagination>
      </Grid>
    </Container>
  );
}

export default Pagination;
