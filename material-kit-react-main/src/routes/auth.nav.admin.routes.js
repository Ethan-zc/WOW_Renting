// @mui icons
import Icon from "@mui/material/Icon";
import FaceIcon from '@mui/icons-material/Face';
import GitHubIcon from "@mui/icons-material/GitHub";

const authNavAdminRoutes = [
  {
    type: "collapse",
    name: "User:" + localStorage.getItem("__account__"),
    key: "profile",
    icon: <FaceIcon />,
    route: "/profile",
  },
//   {
//     type: "collapse",
//     name: "Trip",
//     key: "trip",
//     icon: <CarRentalIcon />,
//     route: "/trip",
//   },
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

export default authNavAdminRoutes;
