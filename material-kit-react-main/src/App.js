import React, { useState, useEffect } from "react";

import UnauthenticatedApp from "unauth-App";
import AuthenticatedApp from "auth-App";

// import { useMaterialUIController } from "context/mui-provider";

// import { useClient } from "context/auth-context";

import { useAuth } from "context/auth-context";

export default function App() {
  // const {test} = useMaterialUIController();
  // const {test} = useClient();
  let user = localStorage.getItem("__account__");
  // console.log(test);
  // const user = true;
  // document.cookie;
  // localStorige
  // useEffect(() => {
    //   console.log(user);
    // }, [user]);
  // let user = false;
  console.log(user);
  return (
    <>
      {user && user !== "" ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}
