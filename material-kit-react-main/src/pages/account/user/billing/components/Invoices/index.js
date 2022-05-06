/*
* GET /invoice/list
* @responseData:
{
  "message": "Success!",
  "success": true,
  "data": [
    {
      "invoiceId": 1,
      "invoiceDate": "2022-05-05T00:00:00.000+00:00",
      "amount": 17004,
      "remain": 0,
      "isPaid": "N",
      "orderId": 1
    }
  ]
}

* POST /payment/pay
* @postData
{
  "amount": 0,
  "cardNum": "string",
  "invoiceId": 0,
  "method": "string"
}
* @responseData:
{
  "data": "string",
  "message": "string",
  "success": true
}
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Billing page components
import Invoice from "pages/account/user/billing/components/Invoice";

// Services
import InvoiceDataService from "services/invoice.service";
import PaymentDataService from "services/payment.service";

function Invoices() {
  const [account] = useState(localStorage.getItem("__account__"));
  const [invoiceData, setInvoiceData] = useState([]);
  const[invoiceId, setInvoiceId] = useState("");
  const[amount, setAmount] = useState("");
  const[cardNum, setCardNum] = useState("");
  const[method, setMethod] = useState("");
  const[errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getCustInvoiceData();
  }, [invoiceId]);

  const getCustInvoiceData = () => {
    InvoiceDataService.getCustInvoiceList(account)
      .then((response) => {
        setInvoiceData(response.data.data);
      });
  }

  const handleOnClickPay = (invoiceId) => {
    setInvoiceId(invoiceId);
    toggleModal();
  }

  const handleOnChangeAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleOnChangeCardNum = (e) => {
    let card = e.target.value;
    setCardNum(card);
    if (card.startsWith("1234")) {
      setMethod("Credit Card");
    } else if (card.startsWith("5678")) {
      setMethod("Debit Card");
    } else {
      setMethod("");
    }
    setCardNum(card);
  }

  const handleOnClickOK = () => {
    if (invoiceId !== "" 
        && amount !== "" 
        && cardNum !== "" 
        && !isNaN(cardNum)
        && method !== "")
    {
      console.log("submit pay")
      let data = {
        amount: amount,
        cardNum: cardNum,
        invoiceId: invoiceId,
        method: method
      }
      PaymentDataService.postPaymRequest(data)
        .then((response) => {
          if (response.data.success === true) {
            toggleModal();
          } else {
            setErrorMsg(response.data.message);
          }
        });
    } else {
      setErrorMsg("Invalid information")
    }
  }

  const [isShow, setIsShow] = useState(false);
  const toggleModal = () => {
    if (isShow) {
      setInvoiceId("");
      setAmount("");
      setCardNum("");
      setMethod("");
      setErrorMsg("");
    }
    setIsShow(!isShow)
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox mb={2} pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Invoices
        </MDTypography>
      </MDBox>
      <Divider sx={{ margin: 1 }} />
      <MDBox px={3}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {invoiceData.map((e, index) => {
            return (
            <Invoice 
              key={index}
              date={new Date(e.invoiceDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
              invoiceId={e.invoiceId.toString()}
              price={e.amount.toString()}
              remain={e.remain.toString()}
              handleOnClickPay={handleOnClickPay}
            />);
          })}
        </MDBox>
      </MDBox>
      <Modal open={isShow} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="up" in={isShow} timeout={400}>
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
              <MKTypography variant="h5">Please enter your payment method</MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={2}>
              {errorMsg !== "" ?
              <MDBox display="flex" justifyContent="left" alignItems="center" px={2} mt={-1} mb={1}>
                <MDTypography variant="caption" color="error" >
                  *{errorMsg}
                </MDTypography>
              </MDBox> : null}
              <MDBox>
                <Grid container rowSpacing={1} px={7} alignContent="center">
                  <Grid item xs={12} md={12}>
                    <MDInput
                      type="text"
                      label="Amount"
                      variant="standard"
                      fullWidth
                      value={amount}
                      onChange={handleOnChangeAmount}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDInput
                      type="text"
                      label="Card Number"
                      variant="standard"
                      fullWidth
                      value={cardNum}
                      onChange={handleOnChangeCardNum}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MDInput
                      type="text"
                      label="Payment Method"
                      variant="standard"
                      fullWidth
                      disabled
                      value={method}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="center" p={1.5}>
              <MKButton variant="gradient" color="info" onClick={handleOnClickOK}>
                OK
              </MKButton>
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
    </Card>
  );
}

export default Invoices;
