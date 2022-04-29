import http from "../http-common";

class CarDataService {
  post(data) {
      return http.post("/cars/list", data);
  }

  get(id) {
    return http.get(`/cars/carid/${id}`);
  }

  create(data) {
    return http.post("/cars/list", data);
  }

  update(id, data) {
    return http.put(`/cars/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cars/${id}`);
  }

  deleteAll() {
    return http.delete(`/cars`);
  }

  findByKeyword(keyword) {
    return http.get(`/cars?keyword=${keyword}`);
  }
}

export default new CarDataService();
