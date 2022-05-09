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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React sections components
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";

// sessions
import OrderDetail from "pages/account/user/order/sessions/OrderDetail";
import OrderList from "pages/account/user/order/sessions/OrderList";

function Tables() {
  const [orderDetail, setOrderDetail] = useState(JSON.parse(sessionStorage.getItem("__orderDetail__")));
  const [successSB, setSuccessSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Notification"
      content="Your car is on the way!"
      open={successSB}
      dateTime="Just Now"
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  useEffect(() => {
    
  }, [orderDetail]);

  const handleOnSubmit = () => {
    sessionStorage.removeItem("__orderDetail__");
    openSuccessSB();
    setOrderDetail(null);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {orderDetail ? 
          <Grid item xs={12}>
            <OrderDetail orderDetail={orderDetail} handleOnSubmit={handleOnSubmit}/>
          </Grid> : null}
          {renderSuccessSB}
          <Grid item xs={12}>
            <OrderList orderDetail={orderDetail} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
