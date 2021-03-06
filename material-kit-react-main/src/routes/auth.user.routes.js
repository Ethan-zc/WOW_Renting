// Material Dashboard 2 React sections
import Profile from "pages/account/user/profile";
import Order from "pages/account/user/order";
import Billing from "pages/account/user/billing";
import Logout from "pages/account/logout";

// @mui icons
import Icon from "@mui/material/Icon";
import GitHubIcon from "@mui/icons-material/GitHub";

const authRoutes = [
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
    name: "Order",
    key: "order",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/order",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
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

