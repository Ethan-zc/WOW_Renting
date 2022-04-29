import http from "../http-common";

class CarDataService {
  getAll() {
    return http.get("/cars/list");
  }

  get(id) {
    return http.get(`/cars/carid/${id}`);
  }

  create(data) {
    return http.post("/cars/request", data);
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
