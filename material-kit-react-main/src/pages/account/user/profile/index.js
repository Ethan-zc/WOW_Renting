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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React sections components
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";
import ProfileInfoCard from "sections/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "pages/account/user/profile/components/Header";

// Services
import AuthDataService from "services/authentication.service";

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  useEffect(() => {
    // let acc = localStorage.getItem("__account__");
    AuthDataService.getCustInfo()
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        let info = response.data.data;
        let basicInfo = {
          fullName: `${info.fname} ${info.lname}`,
          mobile: `${info.phone}`,
          email: `${info.email}`,
          address: `${info.street}, ${info.state} ${info.zipcode}, ${info.country}`,
        };
        let extraInfo = (response.data.data.custType === "I") ? 
          {
            licenseNumber: `${info.licenseNum}`,
            insuranceName: `${info.insName}`,
            insuranceNumber: `${info.insNum ? info.insNum : ""}`,
          } : 
          {
            employeeId: `${info.empId}`,
            corporationName: `${info.corpName}`,
            registerNumber: `${info.regNum}`,
          };
        let data = {...basicInfo, ...extraInfo};
        console.log(data);
        setUserInfo(data);
        setName(data["fullName"]);
        // TODO: update var of fullname
        setIntro(info["custType"] === "I" ? "Individual User" : "Corporation User");
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={name} intro={intro}>
        <MDBox mt={5} mb={3}>
          <Grid item xs={12} md={8} xl={8} sx={{ display: "flex" }}>
            <ProfileInfoCard
              info={Object.assign({}, userInfo)}
              shadow={false}
            />
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}
