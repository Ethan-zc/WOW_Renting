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


// @mui material components
import Card from "@mui/material/Card";
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

import AuthDataService from "services/authentication.service";

export default function TestLogin() {

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  }, []);

  const handleOnChangeAccount = (e) => { 
    setAccount(e.target.value);
  }

  const handleOnChangePassword = (e) => { 
    setPassword(e.target.value);
  }

  const handleDeleteAllCookies = () => {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

  // const handleLoginNoCookie = async () => {
  //   // TODO: change account name
  //   console.log("[handleLoginNoCookie] account: ");
  //   let data = {
  //     accName: account,
  //     pwd: password
  //   }

  //   console.log("[handleLoginNoCookie] account: ");
  //   console.log(data);
  //   const resp = await AuthDataService.login(data);
  //   console.log(resp);
  //   console.log("[handleLoginNoCookie] resp.headers: ");
  //   console.log(resp.headers);
  //   const [cookie] = resp.headers["set-cookie"]; // getting cookie from request
  //   AuthDataService.defaults.headers.Cookie = cookie; // attaching cookie to axiosInstance for future requests
  //   console.log("[handleLoginNoCookie] cookie: ");
  //   console.log(cookie);
  //   console.log("[handleLoginNoCookie] AuthDataService.defaults.headers.Cookie: ");
  //   console.log(AuthDataService.defaults.headers.Cookie);
  // }

  const handleLoginNoCookie = () => {
    // TODO: change account name
    console.log("[handleLoginNoCookie] account: ");
    let data = {
      accName: account,
      pwd: password
    }
    console.log("[handleLoginNoCookie] account: ");
    console.log(data);
    console.log("[handleLoginNoCookie] document.cookie before: ");
    console.log(document.cookie);
    AuthDataService.login(data)
      .then((response) => {
        console.log("[handleLoginNoCookie] response: ");
        console.log(response);
      });
    console.log("[handleLoginNoCookie] document.cookie after: ");
    console.log(document.cookie);
  }

  const handleLoginWithCookie = () => {
    console.log("[handleLoginWithCookie] account: ");
    let data = {
      accName: account,
      pwd: password
    }
    console.log("[handleLoginWithCookie] account: ");
    console.log(data);
    console.log("[handleLoginWithCookie] document.cookie before: ");
    console.log(document.cookie);
    const header = {
      headers: {
        "Content-type": "application/json",
        "Cookie": document.cookie,
        },
      withCredentials: true
    };
    AuthDataService.loginCookie(data, header)
      .then((response) => {
          console.log("[handleLoginWithCookie] response: ");
          console.log(response);
      });
    console.log("[handleLoginWithCookie] document.cookie after: ");
    console.log(document.cookie);
  }

  const handleIsLoginNoCookie = () => {
    console.log("[handleIsLoginNoCookie] document.cookie before: ");
    console.log(document.cookie);
    AuthDataService.isLogin()
      .then((response) => {
        console.log("[handleIsLoginNoCookie] response: ");
        console.log(response);
      });
    console.log("[handleIsLoginNoCookie] document.cookie after: ");
    console.log(document.cookie);
  }

  const handleIsLoginWithCookie = () => {
    console.log("[handleIsLoginWithCookie] document.cookie before: ");
    console.log(document.cookie);
    const header = {
      headers: {
        "Content-type": "application/json",
        "Cookie": "JSESSIONID=MjVmY2ZiYjUtYmIyZC00MjdkLWEyZTItYzEzYmJkOWU3ODcz",
        },
      withCredentials: true
    };
    AuthDataService.isLoginCookie(header)
      .then((response) => {
        console.log("[handleIsLoginWithCookie] response: ");
        console.log(response);
      });
    console.log("[handleIsLoginWithCookie] document.cookie after: ");
    console.log(document.cookie);
  }

  const handleLogoutNoCookie = () => {
    console.log("[handleLogoutNoCookie] document.cookie before: ");
    console.log(document.cookie);
    AuthDataService.logout()
      .then((response) => {
        console.log("[handleLogoutNoCookie] response: ");
        console.log(response);
      });
    console.log("[handleLogoutNoCookie] document.cookie after: ");
    console.log(document.cookie);
  }

  const handleLogoutWithCookie = () => {
    console.log("[handleLogoutWithCookie] document.cookie before: ");
    console.log(document.cookie);
    const header = {
      headers: {
        "Content-type": "application/json",
        "Cookie": document.cookie,
        },
      withCredentials: true
    };
    AuthDataService.logoutCookie(header)
      .then((response) => {
        console.log("[handleLogoutWithCookie] response: ");
        console.log(response);
      });
    console.log("[handleLogoutWithCookie] document.cookie after: ");
    console.log(document.cookie);
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
            Test Login
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
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLoginNoCookie}
              >
                Login (no cookie)
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleIsLoginNoCookie}
              >
                IsLogin (no cookie)
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLogoutNoCookie}
              >
                Logout (no cookie)
              </MDButton>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLoginWithCookie}
              >
                Login (with cookie)
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleIsLoginWithCookie}
              >
                IsLogin (with cookie)
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLogoutWithCookie}
              >
                Logout (with cookie)
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleDeleteAllCookies}
              >
                DeleteCookies
              </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
    </SignInLayout>
  );
}
