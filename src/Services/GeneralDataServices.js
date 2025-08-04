/* eslint-disable */

import axios from "axios";
import { BASE_URL } from "../utils/index";

const ENDPOINT = BASE_URL;
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

  async notifyMeetingSchedule(payload, token) {
    const response = await axios.post(
      `${ENDPOINT}/course/meet/notify`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
}

export default new GeneralDataServices();
