import http from "../http-common";

class InvoiceDataService {
  getCustInvoiceList(data) {
    return http.get("/invoice/list?accName=" + data);
  }

  postPay(data) {
    return http.post("/payment/pay", data);
  }

}

export default new InvoiceDataService();
