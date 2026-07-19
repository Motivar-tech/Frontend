/* eslint-disable */

import axiosInstance from "../utils/axiosInstance";

class PaymentService {
  async InitiatePayment(payload) {
    const response = await axiosInstance.post(`/course/initiate/pay`, payload);
    return response;
  }

  async initiatePaymentVerification(reference) {
    let response = await axiosInstance.get(
      `/course/verify/pay?reference=${reference}`
    );

    return response.data;
  }

  async completeSponsorship(requestID, ref) {
    let response = await axiosInstance.get(
      `/course/approve/payment?requestId=${requestID}&ref=${ref}`
    );

    return response.data;
  }
}

export default new PaymentService();
