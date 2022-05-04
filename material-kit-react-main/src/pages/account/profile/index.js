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

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React sections components
import DashboardLayout from "sections/LayoutContainers/DashboardLayout";
import DashboardNavbar from "sections/Navbars/DashboardNavbar";
import Footer from "sections/Footers/AuthFooter";
import ProfileInfoCard from "sections/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "pages/account/profile/components/Header";


function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid item xs={12} md={8} xl={8} sx={{ display: "flex" }}>
            <ProfileInfoCard
            title="profile information"
            description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
            info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
            }}
            social={[
                {
                link: "https://www.facebook.com/CreativeTim/",
                icon: <FacebookIcon />,
                color: "facebook",
                },
                {
                link: "https://twitter.com/creativetim",
                icon: <TwitterIcon />,
                color: "twitter",
                },
                {
                link: "https://www.instagram.com/creativetimofficial/",
                icon: <InstagramIcon />,
                color: "instagram",
                },
            ]}
            action={{ route: "", tooltip: "Edit Profile" }}
            shadow={false}
            />
          </Grid>
        </MDBox>
      </Header>
      <Footer light={false}/>
    </DashboardLayout>
  );
}

export default Overview;
