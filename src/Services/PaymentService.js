/* eslint-disable */

import axios from "axios";

import { BASE_URL } from "../utils/index";

const ENDPOINT = BASE_URL;

class PaymentService {
  async InitiatePayment(payload, token) {
    const response = await axios.post(
      `${ENDPOINT}/course/initiate/pay`,
      payload,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  async initiatePaymentVerification(token, reference) {
    let response = await axios.get(
      `${ENDPOINT}/course/verify/pay?reference=${reference}`,
      {
        headers: { Authorization: token },
      }
    );

    return response.data;
  }

  async completeSponsorship(token, requestID, ref) {
    let response = await axios.get(
      `${ENDPOINT}/course/approve/payment?requestId=${requestID}&ref=${ref}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  }
}

export default new PaymentService();
