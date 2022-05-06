import http from "../http-common";

class OrderDataService {
  getCustOrderList(data) {
    return http.get("/order/custlist?accName=" + data);
  }

  getOrderList() {
    return http.get("/order/list");
  }

  postCreateOrder(data) {
    return http.post("/order/createOrder", data);
  }

  postUpdateEndOdo(data) {
    return http.post("/order/updateOrder", data);
  }
}

export default new OrderDataService();
