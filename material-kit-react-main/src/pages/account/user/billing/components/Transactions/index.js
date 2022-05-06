/*
* GET /payment/list
* @responseData:
{
  "data": [
    {
      "amount": 0,
      "cardNum": "string",
      "invoiceId": 0,
      "method": "string",
      "paymDate": "2022-05-05T19:46:08.171Z",
      "paymId": 0
    }
  ],
  "message": "string",
  "success": true
}
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "pages/account/user/billing/components/Transaction";

// Services
import PaymentDataService from "services/payment.service";

function Transactions() {
  const [account] = useState(localStorage.getItem("__account__"));
  const [paymData, setPaymData] = useState([]);

  useEffect(() => {
    getCustPaymData();
  }, []);

  const getCustPaymData = () => {
    PaymentDataService.getCustPaymList(account)
      .then((response) => {
        console.log(response.data.data);
        setPaymData(response.data.data);
      });
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Transaction History
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {/* {paymData.map((e, index) => {
            return (
            <Transaction
              key={index}
              color="error"
              icon="expand_more"
              name={e.invoiceId}
              description={new Date(e.paymDate).toLocaleString()}
              value={e.amount}
            />);
          })} */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
