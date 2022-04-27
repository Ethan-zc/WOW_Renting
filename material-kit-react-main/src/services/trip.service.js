import http from "../http-common";

class AddressDataService {
  getAll() {
    return http.get("/cars/list");
  }

  get(id) {
    return http.get(`/addrlist/addrid/${id}`);
  }

  create(data) {
    return http.post("/addrlist/add", data);
  }

  update(id, data) {
    return http.put(`/address/${id}`, data);
  }

  delete(id) {
    return http.delete(`/address/${id}`);
  }

  deleteAll() {
    return http.delete(`/address`);
  }

  findByKeyword(keyword) {
    return http.get(`/address?keyword=${keyword}`);
  }
}

export default new AddressDataService();
