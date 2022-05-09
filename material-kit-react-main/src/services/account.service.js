import http from "../http-common";

class AccountDataService {
  postCorpRegister(data) {
    return http.post("/account/corp/register", data);
  }

  postIndiRegister(data) {
    return http.post("/account/indi/register", data);
  }

  login(data) {
    return http.post("/account/login", data);
  }

  isLogin() {
    return http.get("/account/islogin");
  }

  logout() {
    return http.get("/account/logout");
  }

  loginCookie(data, header) {
    return http.post("/account/login", data, header);
  }

  isLoginCookie(header) {
    return http.get("/account/islogin", header);
  }

  logoutCookie(header) {
    return http.get("/account/logout", header);
  }

  getCustType(data) {
    return http.get("/account/type?accName=" + data);
  }

  getProfile() {
    return http.get("/account/profile");
  }

  getRole() {
    return http.get("/account/getRole");
  }

  getAccountName() {
    return http.get("/account/getAccName");
  }

}

export default new AccountDataService();
