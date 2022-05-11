import AccountDataService from "services/account.service";

export default function Logout() {
  console.log("[logout] logout");
  AccountDataService.logout()
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log("[logout] logout success");
        sessionStorage.removeItem("__orderDetail__");
        window.location.reload();
      }
      console.log("[logout] logout failed");
    });
  return <></>;
}

