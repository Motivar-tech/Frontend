/* eslint-disable */

import axiosInstance from "../utils/axiosInstance";

class GeneralDataServices {
  async RequestHelp(payload) {
    const response = await axiosInstance.post(`/course/request`, payload);

    return response;
  }

  async MeetLearner(requestID, payload) {
    const response = await axiosInstance.post(
      `/course/meet/${requestID}`,
      payload
    );

    return response;
  }

  async GetRequests() {
    const response = await axiosInstance.get(`/course/get`);
    return response;
  }

  async AddProof(requestID, payload) {
    const response = await axiosInstance.post(
      `/course/add-proof/${requestID}`,
      payload
    );
    return response;
  }

  async notifyMeetingSchedule(payload) {
    const response = await axiosInstance.post(
      `/course/meet/notify`,
      payload
    );

    return response.data;
  }
}

export default new GeneralDataServices();
