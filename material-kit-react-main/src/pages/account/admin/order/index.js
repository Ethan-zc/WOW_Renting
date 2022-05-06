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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";
import DataTable from "pages/account/admin/order/sessions/DataTable";

// Services
import OrderDataService from "services/order.service";

export default function OrderList() {
  const initialColumns= [
    { Header: "Order#", accessor: "Order",  align: "left"},
    { Header: "Customer#", accessor: "Customer", align: "center" },
    { Header: "StartOdo", accessor: "StartOdo", align: "center" },
    { Header: "EndOdo", accessor: "EndOdo", align: "center"},
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  const [orderTable, setTable] = useState({
    columns: initialColumns,
    rows: [],
  });
  const [isClicked, setIsClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    getData();
  }, [isClicked]);

  const [infoSB, setInfoSB] = useState(false);
  const closeInfoSB = () => setInfoSB(false);

  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);

  const renderInfoSB = (
    <MDSnackbar
      color="info"
      icon="check"
      title="Notification"
      content= "Submission succeed"
      dateTime= {new Date(Date.now()).toLocaleString("en-us", {year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric", second:"numeric"})}
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="error"
      title="Notification"
      content={`Submission failed: ${errorMsg}`}
      dateTime= {new Date(Date.now()).toLocaleString("en-us", {year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric", second:"numeric"})}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
    />
  );

  const updateEndOdo = (e) => {
    let rowElement = e.target.parentElement.parentElement.parentElement.parentElement;
    let endOdo = rowElement.querySelector('[name=EndOdo]').value;
    let orderId = rowElement.querySelector('[name=OrderId]').innerHTML;
    let startOdo = rowElement.querySelector('[name=StartOdo]').innerHTML;
    let updateOrderData = {
      "endOdo": endOdo,
      "orderId": orderId,
      "startOdo": startOdo
    }
    console.log(updateOrderData);
    OrderDataService.postUpdateEndOdo(updateOrderData)
      .then((response) => {
        if(response.data.message.includes("Error")) {
          setErrorMsg(response.data.message);
          setErrorSB(true);
        } else {
          setIsClicked(!isClicked);
          setInfoSB(true);
        }
      });
  }

  function updateTable(newRows){
    setTable({
      ...orderTable,
      rows: newRows
    });
  }

  function getData(){
    OrderDataService.getOrderList()
      .then(function (response) {
        let newRows = [];
        response.data.forEach(order => {
          newRows.push({
            Order: ( 
              <MDTypography name="OrderId" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
               {order.orderId} 
              </MDTypography>
            ),
            Customer: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                {order.custId} 
              </MDTypography>
            ),
            StartOdo: (
              <MDTypography name="StartOdo" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
                {order.startOdo} 
              </MDTypography>
            ),
            EndOdo: (
              <MDBox ml={0}>
                { order.endOdo!=0 &&
                  <MDTypography name="EndOdo" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
                    {order.endOdo} 
                  </MDTypography>
                }
                { order.endOdo==0 &&
                  <MDInput type="text" name="EndOdo" label="Update End Odometer" variant="standard" data-orderid={order.orderId}/>
                }
              </MDBox>
            ),
            status: (
              <MDBox ml={-1}>
                { order.endOdo!=0 &&
                  <MDBadge badgeContent="Completed" color="dark" variant="gradient" size="sm" />
                }
                { order.endOdo==0 &&
                  <MDBadge badgeContent="In Progess" color="success" variant="gradient" size="sm" />
                }
              </MDBox>
            ),
            action: (
              <MDBox mt={1} mb={1}>
                { order.endOdo!=0 &&
                  <MDTypography component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
                    No Action Required
                  </MDTypography>
                }
                { order.endOdo==0 &&
                  <MDButton variant="gradient" color="info" data-orderid={order.orderId} onClick={self => updateEndOdo(self)}>
                    Submit
                  </MDButton>
                }
              </MDBox>
            )
          });
          
        });
        updateTable(newRows);
    });


  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Order Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={4}>
                <DataTable
                  table={orderTable}
                  isSorted={true}
                  canSearch={false}
                  entriesPerPage={{defaultValue: 5}}
                  showTotalEntries={false}
                  noEndBorder
                />
                {renderInfoSB}
                {renderErrorSB}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );

}
