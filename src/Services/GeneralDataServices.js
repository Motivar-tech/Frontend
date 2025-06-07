/* eslint-disable */

import axios from "axios";

const ENDPOINT = "https://motivar-sponsor-api-v1.onrender.com";
//const ENDPOINT = "http://localhost:8089";

class GeneralDataServices {
  async RequestHelp(payload, token) {
    const response = await axios.post(`${ENDPOINT}/course/request`, payload, {
      headers: { Authorization: token },
    });

    return response;
  }

  async MeetLearner(requestID, payload, token) {
    const response = await axios.post(
      `${ENDPOINT}/course/meet/${requestID}`,
      payload,
      { headers: { Authorization: token } }
    );

    return response;
  }

  async GetRequests() {
    const response = await axios.get(`${ENDPOINT}/course/get`);
    return response;
  }

  async AddProof(requestID, payload, token) {
    const response = await axios.post(
      `${ENDPOINT}/course/add-proof/${requestID}`,
      payload,
      { headers: { Authorization: token } }
    );
    return response;
  }

  async InitiatePayment(requestID, token) {
    const response = await axios.post(
      `${ENDPOINT}/course/initiate/payment/${requestID}`,
      {},
      { headers: { Authorization: token } }
    );
    return response;
  }
}

export default new GeneralDataServices();
