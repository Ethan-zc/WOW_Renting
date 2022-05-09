/**
 * * @responseData:
{
  "message": "Success!",
  "success": true,
  "data": {
    "accName": "bb",
    "custType": "C",
    "email": "iygj@nyu.edu",
    "phone": "(162)-472-850",
    "street": "S St",
    "state": "WA",
    "country": "USA",
    "zipcode": 98101,
    "licenseNum": null,
    "insName": null,
    "insNum": null,
    "corpName": "Google",
    "regNum": "gg123",
    "empId": "gg456",
    "lname": null,
    "fname": null
  }
}
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
import AccountDataService from "services/account.service";

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  useEffect(() => {
    // let acc = localStorage.getItem("__account__");
    AccountDataService.getProfile()
      .then((response) => {
        let info = response.data.data;
        let data = {
          account: `${info.accName}`,
          mobile: `${info.phone}`,
          email: `${info.email}`,
          address: `${info.street}, ${info.state} ${info.zipcode}, ${info.country}`,
        };
        setUserInfo(data);
        setName(`${info.fname} ${info.lname}`);
        setIntro("Administrator");
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
