import http from "../http-common";

class OrderDataService {
  postCreateOrder(data) {
    return http.post("/order/createOrder", data);
  }
}

export default new OrderDataService();
