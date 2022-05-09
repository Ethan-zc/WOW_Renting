// @mui icons
import CarRentalIcon from "@mui/icons-material/CarRental";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const unauthNavRoutes = [
  {
    name: "trip",
    icon: <CarRentalIcon />,
    route: "/trip",
  },
  {
    name: "account",
    icon: <AccountCircleIcon />,
    collapse: [
      {
        name: "sign in",
        route: "/authentication/sign-in",
      },
      {
        name: "sign up",
        route: "/authentication/sign-up",
      },
      {
        name: "test login",
        route: "/authentication/test-login",
      },
    ],
  },
  {
    name: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/Ethan-zc/WOW_Renting/tree/master",
  },
];

export default unauthNavRoutes;
