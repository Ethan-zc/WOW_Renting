import http from "../http-common";

class AuthDataService {
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

//   getCustInfo(data) {
//     return http.get("/account/profile?accName=" + data);
//   }
  getCustInfo() {
    return http.get("/account/profile");
  }
}

export default new AuthDataService();
