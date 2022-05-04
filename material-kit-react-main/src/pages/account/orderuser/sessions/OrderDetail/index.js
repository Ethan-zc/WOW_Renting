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

// Services
import OrderDataService from "services/order.service";

const labelOrder = {
  carId: "Car ID",
  custId: "Customer ID",
  discId: "Discount ID",
  discType: "Discount type",
  dropOff: "Drop off",
  endDate: "End date",
  endOdo: "End odometer",
  odoLimit: "Odometer limit",
  orderId: "Order ID",
  pickUp: "Pick up",
  startDate: "Start date",
  startOdo: "Start odometer"
}

const dataPost = {
  accName: "aa",
  carId: 1,
  distNum: "9675731",
  dropOff: 2,
  endDate: "2022-05-04T18:10:30.225Z",
  pickUp: 2,
  startDate: "2022-05-04T18:10:30.225Z"
}

export default function OrderDetail() {
  // const navigate = useNavigate();

  // order data package
  const initOrderData = JSON.parse(JSON.stringify(labelOrder));
  Object.keys(initOrderData).forEach((prop) => initOrderData[prop] = "1");

  const [dataOrder, setDataCorp] = useState(initOrderData);
  const [isSubmit, setIsSubmit] = useState(false);

  // const handleOnChangeCorp = (e, prop) => {
  //   setDataCorp({
  //     ...dataCorp,
  //     [prop]: e.target.value,
  //   });
  //   if (prop in isNumCorp) {
  //     isNaN(e.target.value) 
  //     ? setIsNumCorp({...isNumCorp, [prop]: false})
  //     : setIsNumCorp({...isNumCorp, [prop]: true});
  //   }
  // }

  const handleOnClickSubmit = () => {
    // check if filled all blanks
    console.log("[OrderDetail] post data package");
    console.log(dataPost);

    return OrderDataService.postCreateOrder(dataPost)
      .then((response) => {
        if (response.success === "true") {
          console.info("[OrderDetail] postCreateOrder success");
          setIsSubmit(!isSubmit);
        } else {
          console.info("[SignUp] postCreateOrder fail");
          console.error(response.data.status);
          console.error(response.data.message);
        }
      })
      .catch(error => {
        console.error("[SignUp] postCorpData ERROR ", error);
      });

    setIsSubmit(true);
  }

  const handleCloseModal = () => {
    // TODO: login account with tonken
    console.log("[SignUp] handleCloseModal");
    setIsSubmit(!isSubmit);
    // navigate("/dashboard");
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
          New Order
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={5}>
        <MDBox component="form" role="form">
          <MDBox>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {Object.keys(labelOrder).map((prop, index) => {
                return (
                  <Grid
                  item
                  key={index}
                  xs={prop === "corpname" ? 6 : 3}
                  >
                    <MDBox>
                      <MDInput
                        type="text"
                        label={labelOrder[prop]}
                        variant="standard"
                        disabled
                        fullWidth
                        value={dataOrder[prop]}
                      />
                    </MDBox>
                  </Grid>
                );
              })}
            </Grid>
          </MDBox>
          <MDBox mt={3} mb={1}>
            <Grid container justifyContent="right" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
              <MDButton variant="gradient" color="dark" width="30%" disabled={isSubmit}
                onClick={handleOnClickSubmit}>
                Submit
              </MDButton>
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
      <Modal open={isSubmit} onClose={handleCloseModal} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="down" in={isSubmit} timeout={400}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            bgColor="white"
            shadow="xl"
          >
            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
              <MKTypography variant="h5">Success</MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleCloseModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={2}>
              <MKTypography variant="body2" color="secondary" fontWeight="regular">
                Thank your for your registration
              </MKTypography>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="center" p={1.5}>
              <MKButton variant="gradient" color="info" onClick={handleCloseModal}>
                enter
              </MKButton>
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
    </Card>
  );
}
