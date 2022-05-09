import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Kit 2 React pages
import Welcome from "pages/welcome";
import Trip from "pages/trip";

// Material Dashboard 2 React routes
import unauthRoutes from "routes/unauth.routes";
import unauthNavRoutes from "routes/unauth.nav.routes";

export default function UnauthenticatedApp() {
 
  const { pathname } = useLocation();

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
        return <Route exact path={route.route} element={route.component} key={route} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(unauthRoutes)}
        <Route path="/welcome" element={<Welcome routes={unauthNavRoutes}/>} />
        <Route path="/trip" element={<Trip routes={unauthNavRoutes}/>} />
        <Route path="/logout" element={<Navigate to="/welcome" />} />
        <Route path="/material-kit-react" element={<Navigate to="/welcome" />} />
      </Routes>
    </ThemeProvider>
  );
}
