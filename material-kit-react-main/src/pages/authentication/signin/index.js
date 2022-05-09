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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import SignInLayout from "pages/authentication/components/SignInLayout";

// Images
import bgImage from "assets/images/bg-sign-in-cover.jpeg";

import AccountDataService from "services/account.service";

export default function SignIn() {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isSubmit = localStorage.getItem("isSubmit");
    let isRM = localStorage.getItem("rememberMe");
    let rm = false;
    let acc = "";
    if (isSubmit && isSubmit === "true") {
      rm = (isRM && isRM === "true") ? true : false;
      acc = rm ? localStorage.getItem("account") : "";
    }
    setRememberMe(rm);
    setAccount(acc);
    localStorage.setItem("rememberMe", rm);
    localStorage.setItem("account", acc);
    if (!acc) {
      localStorage.setItem("isSubmit", false);
    }
  }, []);

  const handleOnChangeAccount = (e) => { 
    setAccount(e.target.value);
  }

  const handleOnChangePassword = (e) => { 
    setPassword(e.target.value);
  }

  const handleSetRememberMe = () => { 
    localStorage.setItem("rememberMe", !rememberMe);
    setRememberMe(!rememberMe);
  }

  const handleOnClickSignIn = () => {
    console.log("[SignIn] clicked! account: " + account);
    localStorage.setItem("isSubmit", true);
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("account", rememberMe ? account : "");

    console.log("[SignIn] handleOnClickSignIn account: ");
    let data = {
      accName: account,
      pwd: password
    }
    console.log(data);
    AccountDataService.login(data)
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          // login success
          localStorage.setItem("__account__", account);
          if (sessionStorage.getItem("__orderDetail__")) {
            console.log("1")
            navigate("/order")
          } else {
            console.log("2")
            navigate("/profile")
          }
          window.location.reload();
        } else {
          // login fail
          setErrorMsg(response.data.message);
        }
      });
  }

  return (
    <SignInLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {errorMsg &&
            <MDBox display="flex" justifyContent="left" alignItems="center" mt={-2} mb={2}>
              <MDTypography variant="caption" color="error" >
                *{errorMsg}
              </MDTypography>
            </MDBox>}
            <MDBox mb={2}>
              <MDInput 
                type="text" 
                label="Account"
                fullWidth
                value={account}
                onChange={handleOnChangeAccount}
                autoComplete="off"
              >
                {account}
              </MDInput>
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password"
                label="Password"
                value={password}
                onChange={handleOnChangePassword}
                fullWidth
              >
                {password}
              </MDInput>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleOnClickSignIn}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </SignInLayout>
  );
}
