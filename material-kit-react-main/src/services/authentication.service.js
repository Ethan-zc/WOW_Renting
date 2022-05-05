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

  getCustInfo(data) {
    return http.get("/account/profile?accName=" + data);
  }
  // get(id) {
  //   return http.get(`/cars/carid/${id}`);
  // }

  // create(data) {
  //   return http.post("/cars/list", data);
  // }

  // update(id, data) {
  //   return http.put(`/cars/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/cars/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/cars`);
  // }

  // findByKeyword(keyword) {
  //   return http.get(`/cars?keyword=${keyword}`);
  // }
}

export default new AuthDataService();
