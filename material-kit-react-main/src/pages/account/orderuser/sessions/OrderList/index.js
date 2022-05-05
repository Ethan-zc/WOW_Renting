/*
* Data package
* @postData: orderInfo
{
  "carId": 0,
  "distNum": "string",
  "dropOff": 0,
  "endDate": "2022-05-04T18:10:30.225Z",
  "pickUp": 0,
  "startDate": "2022-05-04T18:10:30.225Z"
}
* @responseData: 
{
  "data": {
    "carId": 0,
    "custId": "string",
    "discId": 0,
    "discType": "string",
    "dropOff": 0,
    "endDate": "string",
    "endOdo": 0,
    "odoLimit": 0,
    "orderId": 0,
    "pickUp": 0,
    "startDate": "string",
    "startOdo": 0
  },
  "message": "string",
  "success": true
}
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

import DataTable from "sections/Tables/DataTable";

// Services
import OrderDataService from "services/order.service";
import data from "pages/dashboard/components/Projects/data";

import orderTableData from "pages/account/orderuser/data/orderTableData";

export default function OrderList() {
  const { columns, rows } = orderTableData();
  // const navigate = useNavigate();

  // let orderDetail = JSON.parse(sessionStorage.getItem("orderDetail"));
  // sessionStorage.removeItem("orderDetail");
  // order data package
//   const [labelOrder, setlabelOrder] = useState(orderDetail.dataHead);
//   const [dataOrder, setDataOrder] = useState(orderDetail.data);
  const [distNum, setDistNum] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChangeDiscount = (e) => {
    setDistNum(e.target.value)
  }

  const handleOnClickSubmit = () => {
    // check if filled all blanks
    console.log("[OrderDetail] post data package");

    // let dataPost = {
    //   accName: localStorage.getItem("__account__"),
    //   carId: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("carId")],
    //   distNum: distNum,
    //   dropOff: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("officeId")],
    //   endDate: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("ddate")],
    //   pickUp: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("officeId")],
    //   startDate: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("pdate")],
    // }
    // console.log(dataPost);

    // return OrderDataService.postCreateOrder(dataPost)
    //   .then((response) => {
    //     console.info(response.data);
    //     if (response.data.success == true) {
    //       console.info("[OrderDetail] postCreateOrder success");
    //       // setIsSubmit(true);
    //     } else {
    //       console.error("[OrderDetail] postCreateOrder fail");
    //       setErrorMessage(response.data.message);
    //       console.error(response.data.message)
    //     }
    //   })
    //   .catch(error => {
    //     console.error("[OrderDetail] postCorpData ERROR ", error);
    //   });
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
          Authors Table
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}
