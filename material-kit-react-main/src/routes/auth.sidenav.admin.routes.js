
// @mui icons
import Icon from "@mui/material/Icon";
import SummarizeIcon from '@mui/icons-material/Summarize';
import GitHubIcon from "@mui/icons-material/GitHub";

const authSideNavAdminRoutes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
  },
  {
    type: "collapse",
    name: "Orders",
    key: "order",
    icon: <SummarizeIcon />,
    route: "/order",
  },
  // {
  //   type: "collapse",
  //   name: "Trip",
  //   key: "trip",
  //   icon: <CarRentalIcon />,
  //   route: "/trip",
  // },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
  },
  {
    type: "collapse",
    name: "Github",
    key: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/Ethan-zc/WOW_Renting/tree/master",
  },
];

export default authSideNavAdminRoutes;

