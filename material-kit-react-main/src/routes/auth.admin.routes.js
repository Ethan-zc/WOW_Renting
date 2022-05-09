// Material Dashboard 2 React sections
import Profile from "pages/account/admin/profile";
import Order from "pages/account/admin/order";
import Logout from "pages/account/logout";

// @mui icons
import Icon from "@mui/material/Icon";
import SummarizeIcon from '@mui/icons-material/Summarize';
import GitHubIcon from "@mui/icons-material/GitHub";

const authRoutes = [
  {
    type: "collapse",
    name: "Orders",
    key: "order",
    icon: <SummarizeIcon />,
    route: "/order",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    type: "collapse",
    name: "Github",
    key: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/Ethan-zc/WOW_Renting/tree/master",
  },
];

export default authRoutes;

