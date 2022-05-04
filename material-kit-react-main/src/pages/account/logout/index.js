import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "pages/welcome/components/PageLayout";
import MKTypography from "components/MKTypography";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.setItem("__account__", "");
    localStorage.removeItem("__account__");
    navigate("/welcome");
  });

  return (
    <PageLayout>
      <MKTypography>
        logout!
      </MKTypography>
    </PageLayout>
  );
}

export default Logout;
