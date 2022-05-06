import http from "../http-common";

class PaymentDataService {
  
  getCustPaymList(data) {
    return http.get("/payment/list?accName=" + data);
  }

  postPaymRequest(data) {
    return http.post("/payment/pay", data);
  }

}

export default new PaymentDataService();
