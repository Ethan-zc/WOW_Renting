// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// Pages
import SignIn from "pages/authentication/signin";
import SignUp from "pages/authentication/signup";
import TestLogin from "pages/authentication/TestLogin.js";

const unauthRoutes = [
  {
    name: "account",
    icon: <AccountCircleIcon />,
    collapse: [
      {
        name: "sign in",
        route: "/authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "sign up",
        route: "/authentication/sign-up",
        component: <SignUp />,
      },
      {
        name: "test login",
        route: "/authentication/test-login",
        component: <TestLogin />,
      },
    ],
  },
  {
    name: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/Ethan-zc/WOW_Renting/tree/master",
  },
];

export default unauthRoutes;
