
import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "sections/Sidenav";
import Configurator from "sections/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import authUserRoutes from "routes/auth.user.routes";
import authNavUserRoutes from "routes/auth.nav.user.routes";
import authSideNavUserRoutes from "routes/auth.sidenav.user.routes";
import authAdminRoutes from "routes/auth.admin.routes";
import authNavAdminRoutes from "routes/auth.nav.admin.routes";
import authSideNavAdminRoutes from "routes/auth.sidenav.admin.routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logo-zzz.png";
import brandDark from "assets/images/logo-zzz.png";

// common pages
import Welcome from "pages/welcome";
import Trip from "pages/trip";

import AccountDataService from "services/account.service";

export default function AuthenticatedApp() {
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    AccountDataService.isLogin()
      .then((response) => {
        console.log("[AuthenticatedApp] ", response.data.message);
        if (response.data.success) {
          setStatus(true);
        }
      });
  }, []);
  console.log("status ", status);
  useEffect(() => {
    if (status) {
      AccountDataService.getRole()
        .then((response) => {
          setRole(response.data.data);
        });
    }
  }, [status]);
  console.log("role ", role);

  // const user = localStorage.getItem("__account__");

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route path={route.route} element={route.component} key={route} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="ZZZ Car Rental"
            routes={role === "customer" ? authSideNavUserRoutes : authSideNavAdminRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(role === "customer" ? authUserRoutes : authAdminRoutes)}
        <Route path="/welcome" element={<Welcome routes={role === "customer" ? authNavUserRoutes : authNavAdminRoutes}/>} />
        <Route path="/trip" element={<Trip routes={role === "customer" ? authNavUserRoutes : authNavAdminRoutes}/>} />
        <Route path="/material-kit-react" element={<Navigate to="/welcome" />} />
      </Routes>
    </ThemeProvider>
  );
}
