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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React sections
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";

// Billing page components
import Invoices from "pages/account/user/billing/components/Invoices";
import Transactions from "pages/account/user/billing/components/Transactions";

function Billing() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => {
    console.log("handleUpdate");
    setIsUpdate(!isUpdate);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <Invoices handleUpdate={handleUpdate} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Transactions isUpdate={isUpdate}/>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
