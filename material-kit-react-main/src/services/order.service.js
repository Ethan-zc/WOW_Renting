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

  putUpdateEndOdo(data) {
    return http.put("/order/updateOrder", data);
  }
}

export default new OrderDataService();
