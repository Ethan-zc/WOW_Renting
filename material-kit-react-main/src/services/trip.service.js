import http from "../http-common";

class CarDataService {
  post(data) {
      return http.post("/cars/list", data);
  }
}

export default new CarDataService();
