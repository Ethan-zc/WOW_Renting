import React, { useState, useEffect } from "react";

import UnauthenticatedApp from "unauth-App";
import AuthenticatedApp from "auth-App";


const AuthContext = React.createContext()

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export default function App() {
  // const {user} = useAuth();

  const user = false;
  // document.cookie;
  // localStorige
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}
