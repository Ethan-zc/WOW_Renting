import { useState, useEffect } from "react";

import UnauthenticatedApp from "unauth-App";
import AuthenticatedApp from "auth-App";

import AccountDataService from "services/account.service";

export default function App() {
  // check login status
  const [status, setStatus] = useState(false);
  useEffect(() => {
    AccountDataService.isLogin()
      .then((response) => {
        console.log("[App] ", response.data.message);
        if (response.data.success) {
          setStatus(true);
        }
      });
  }, [status]);

  return (
    <>
      { status ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}
