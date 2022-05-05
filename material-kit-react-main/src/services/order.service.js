import http from "../http-common";

class OrderDataService {
  postCreateOrder(data) {
    return http.post("/order/createOrder", data);
  }

  getCustOrderList(data) {
    return http.get("/order/custlist?accName=" + data);
  }

}

export default new OrderDataService();
