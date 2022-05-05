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

import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";
import Footer from "sections/Footers/FooterAuth";
import DataTable from "sections/Tables/DataTable";

import axios from "axios";
import MDInput from "components/MDInput";
import { AlertTitle } from "@mui/material";


function Tables() {

  const http= axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-type": "application/json",
    },
  });
  const date = new Date();
  const currentDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  const [infoSB, setInfoSB] = React.useState(false);
  const closeInfoSB = () => setInfoSB(false);

  const renderInfoSB = (
    <MDSnackbar
    color="light"
    icon="notifications"
    title="Submit Notification"
    content= "Submission succeed"
    dateTime= {currentDate}
    open={infoSB}
    onClose={closeInfoSB}
    close={closeInfoSB}
    />
  );

  const updateEndOdo = e => {
      let rowElement = e.target.parentElement.parentElement.parentElement.parentElement;
      let endOdo = rowElement.querySelector('[name=EndOdo]').value;
      let orderId = rowElement.querySelector('[name=OrderId]').innerHTML;
      let startOdo = rowElement.querySelector('[name=StartOdo]').innerHTML;
      // console.log(EndOdo, OrderId, StartOdo);
      let updateOrderData = {
        "endOdo": endOdo,
        "orderId": orderId,
        "startOdo": startOdo
      }
      console.log(updateOrderData);
      http.post(`order/updateOrder`, updateOrderData).then( response => {
        console.log(response.status);
        console.log(response.data);
        // TODO: add case for post success
        // feedback="Submission Successed";
        setInfoSB(true);
      });
  }

  const searchCustOrder = e => {
    let customerName = e.target.parentElement.querySelector('[name=custName]').value;
    getCusData(customerName);
  }


  function updateTable(newRows){
    setTable({columns: orderTable.columns, rows: newRows});
  }

  function updateCustTable(newRows){
    setCustTable({columns: custTable.columns, rows: newRows})
  }

  function handelClick(){
    alert("Update end odometer:");
  }

  function getData(){
    
    http.get(`/order/list`)
    .then(function (response) {
        let newRows = [];
        
        response.data.forEach(order => {
          newRows.push({
            Order: ( 
              <MDTypography name="OrderId" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
               {order.orderId} 
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
            Customer: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                {order.custId} 
              </MDTypography>
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

  function getCusData(custName){
    http.get(`order/custlist?accName=${custName}`)
    .then(function (response) {
        let newRows1 = [];

        if(!response.data.data){
          updateCustTable(newRows1);
          alert("No such an account name");
        }
        response.data.data.forEach(order => {
          newRows1.push({
            Order: ( 
              <MDTypography name="OrderId" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
               {order.orderId} 
              </MDTypography>
            ),
            StartOdo: (
              <MDTypography name="StartOdo" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
                {order.startOdo} 
              </MDTypography>
            ),
            EndOdo: (
              <MDTypography name="EndOdo" component="a" variant="caption" color="text" fontWeight="medium" data-orderid={order.orderId}>
                {order.endOdo} 
              </MDTypography>
            ),
            OdoLimit: (
                <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                  {order.odoLimit} 
                </MDTypography>
            ),
            Customer: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                {order.custId} 
              </MDTypography>
            ),
            Startdate: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                {order.startDate} 
              </MDTypography>
            ),
            EndDate: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                {order.endDate} 
              </MDTypography>
            )
          });
          
        });
        updateCustTable(newRows1);
    });
  }
  
  const initialColumns= [
    { Header: "Order#", accessor: "Order",  align: "left"},
    { Header: "StartOdo", accessor: "StartOdo", align: "center" },
    { Header: "EndOdo", accessor: "EndOdo", align: "center"},
    { Header: "Customer#", accessor: "Customer", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  const initialRows = [];


  const initialColumns1= [
    { Header: "Order#", accessor: "Order",  align: "left"},
    { Header: "StartOdo", accessor: "StartOdo", align: "center" },
    { Header: "EndOdo", accessor: "EndOdo", align: "center"},
    { Header: "OdoLimit", accessor: "OdoLimit", align: "center"},
    { Header: "Customer#", accessor: "Customer", align: "center" },
    { Header: "Startdate", accessor: "Startdate", align: "center" },
    { Header: "EndDate", accessor: "EndDate", align: "center" },
  ];
  const initialRows1 = [];

  const [orderTable, setTable] = React.useState({columns: initialColumns, rows: initialRows});


  React.useEffect(() => {
    getData();
  }, []);



  const [custTable, setCustTable] = React.useState({columns: initialColumns1, rows: initialRows1});

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
              <MDBox pt={3}>
                <DataTable
                  table={orderTable}
                  isSorted={true}
                  canSearch={false}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  noEndBorder
                />
                {renderInfoSB}
              </MDBox>
              <MDBox>
                <br></br>
                <MDTypography verticalAlign="text-bottom" variant="h6" color="info">
                  Search the account by name:
                </MDTypography>
                <MDInput type="text" name='custName'/>
                <MDButton name="searchButton" variant="gradient" color="info" onClick={self => searchCustOrder(self)}>
                  Search
                </MDButton>
              </MDBox>
              <MDBox
                mx={2}
                mt={3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Customer Table List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={custTable}
                  isSorted={false}
                  canSearch={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );

}

export default Tables;
