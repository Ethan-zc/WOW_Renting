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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Services
import OrderDataService from "services/order.service";
import AuthDataService from "services/authentication.service";

export default function OrderDetail(props) {
  // const navigate = useNavigate();
  const {orderDetail, handleOnSubmit} = props;

  // order data package
  const [labelOrder] = useState(orderDetail.dataHead);
  const [dataOrder] = useState(orderDetail.data);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [distNum, setDistNum] = useState("");
  const [custType, setCustType] = useState("");

  useEffect(() => {
    AuthDataService.getCustType(localStorage.getItem("__account__"))
      .then((response) => {
        console.log(response.data);
        setCustType(response.data.data)})
  }, []);

  const handleOnChangeDiscount = (e) => {
    setDistNum(e.target.value)
  }

  const handleOnClickSubmit = () => {
    console.log("[OrderDetail] post data package");
    console.log();

    // FIXME: date format error
    let dataPost = {
      accName: localStorage.getItem("__account__"),
      carId: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("carId")],
      distNum: distNum,
      dropOff: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("officeId")],
      endDate: new Date(dataOrder[Array.from(Object.keys(labelOrder)).indexOf("ddate")]).toISOString(),
      pickUp: dataOrder[Array.from(Object.keys(labelOrder)).indexOf("officeId")],
      startDate: new Date(dataOrder[Array.from(Object.keys(labelOrder)).indexOf("pdate")]).toISOString(),
    }
    console.log(dataPost);

    // TODO: cannot identify empty coupon
    return OrderDataService.postCreateOrder(dataPost)
      .then((response) => {
        console.info(response.data);
        if (response.data.success === true) {
          console.info("[OrderDetail] postCreateOrder success");
          handleOnSubmit();
        } else {
          console.error("[OrderDetail] postCreateOrder fail");
          console.error(response.data.message)
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error("[OrderDetail] postCorpData ERROR ", error);
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
          New Order
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={5}>
        <MDBox component="form" role="form">
          {errorMessage ?
          <MDBox display="flex" justifyContent="left" alignItems="center" mt={-1} mb={1}>
            <MDTypography variant="caption" color="error" >
              *{errorMessage}
            </MDTypography>
          </MDBox>
          : null}
          <MDBox>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {Object.keys(labelOrder).map((prop, index) => {
                return (
                  labelOrder[prop].includes("ID") ? null :
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
                        value={dataOrder[index]}
                      />
                    </MDBox>
                  </Grid>
                );
              })}
              <Grid item xs={6} >
                <MDInput
                  type="text"
                  label={custType === "I" ? "Individual Coupon" : "Corporation Set Number"}
                  variant="standard"
                  fullWidth
                  error={errorMessage ? true : false}
                  value={distNum}
                  onChange={handleOnChangeDiscount}
                />
              </Grid>
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
    </Card>
  );
}
