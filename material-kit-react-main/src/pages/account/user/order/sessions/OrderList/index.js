/*
* Data package
* @responseData: 
{
  "message": "Success!",
  "success": true,
  "data": [
    {
      "orderId": 1,
      "startOdo": 1000,
      "endOdo": 1500,
      "odoLimit": 40,
      "startDate": "2020-03-01 00:00:00",
      "endDate": "2020-03-05 00:00:00",
      "custId": "1",
      "pickUp": 2,
      "dropOff": 3,
      "carId": 1,
      "discType": null,
      "discId": 0
    },
  ]
}
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import DataTable from "pages/account/user/order/sessions/DataTable";

// Services
import OrderDataService from "services/order.service";

export default function OrderList() {
  const [account] = useState(localStorage.getItem("__account__"));
  const initColumns= [
    { Header: "Order#", accessor: "order",  align: "left"},
    { Header: "StartOdo", accessor: "startOdo", align: "center" },
    { Header: "EndOdo", accessor: "endOdo", align: "center"},
    { Header: "OdoLimit", accessor: "odoLimit", align: "center"},
    { Header: "Startdate", accessor: "startdate", align: "center" },
    { Header: "EndDate", accessor: "endDate", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
  ];
  const [custTable, setCustTable] = useState({
    columns: initColumns,
    rows: [],
  });

  useEffect(() => {
    getCustOrderData();
  }, []);

  const getCustOrderData = () => {
    OrderDataService.getCustOrderList(account)
      .then((response) => {
        console.log(response.data.data);
        let newRows = [];
        // TODO: check if succeed
        response.data.data.forEach((order) => {
          console.log(order.endOdo)
          newRows.push({
            order: ( 
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                {order.orderId} 
              </MDTypography>
            ),
            startOdo: (
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                {order.startOdo} 
              </MDTypography>
            ),
            endOdo: (
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                {order.endOdo} 
              </MDTypography>
            ),
            odoLimit: (
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                  {order.odoLimit} 
                </MDTypography>
            ),
            startdate: (
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                {order.startDate} 
              </MDTypography>
            ),
            endDate: (
              <MDTypography component="a" variant="text" color="text" fontWeight="regular">
                {order.endDate} 
              </MDTypography>
            ),
            status: (
              <MDBox ml={-1}>
                {/* TODO: get invoice remains by order? */}
                <MDBadge 
                  badgeContent={(order.endOdo !== 0) ? "completed": "in progress" } 
                  color={(order.endOdo !== 0) ? "success" : "info"} 
                  variant="gradient" 
                  size="sm"/>
              </MDBox>
            ),
          });
        });

        setCustTable({
          ...custTable,
          rows: newRows,
        });
    });
  }

  return (
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
          Order List
        </MDTypography>
      </MDBox>
      <MDBox pt={3} p={3}>
        <DataTable
          table={custTable}
          isSorted={true}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}
