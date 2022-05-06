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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import PaidIcon from '@mui/icons-material/Paid';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Invoice({ date, invoiceId, price, remain, noGutter, handleOnClickPay }) {

  const onClickPay = (invoiceId) => {
    handleOnClickPay(invoiceId);
  }


  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          Invoice ID: {invoiceId}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" >
        <MDBox lineHeight={1.125} textAlign="right" >
          <MDTypography display="block" variant="button" fontWeight="medium" color="text">
            {price}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" color="text">
            Left to pay: {remain}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
          <MDButton variant="gradient" size="small" color="warning" disabled={remain==="0" ? true : false} onClick={()=>onClickPay(invoiceId)}>
            <PaidIcon />
            <MDTypography variant="button" href="#" fontWeight="bold" color="white">
              &nbsp;PAY
            </MDTypography>
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  invoiceId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  remain: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
