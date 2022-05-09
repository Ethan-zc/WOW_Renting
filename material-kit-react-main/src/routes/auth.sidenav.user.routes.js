// @mui icons
import Icon from "@mui/material/Icon";
import CarRentalIcon from "@mui/icons-material/CarRental";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GitHubIcon from "@mui/icons-material/GitHub";

const authRoutes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
  },
  {
    type: "collapse",
    name: "Order",
    key: "order",
    icon: <FormatListBulletedIcon />,
    route: "/order",
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
  },
  {
    type: "collapse",
    name: "Trip",
    key: "trip",
    icon: <CarRentalIcon />,
    route: "/trip",
  },
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

export default authRoutes;

