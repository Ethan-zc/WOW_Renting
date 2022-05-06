export default function Logout() {
  localStorage.removeItem("__account__");
  window.location.reload();
}

