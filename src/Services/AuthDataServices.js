/* eslint-disable */

import axios from "axios";
const ENDPOINT = "https://motivar-sponsor-api-v1.onrender.com";
//const ENDPOINT = "http://localhost:8089";

class AuthDataServices {
  async signUp(payload) {
    const response = await axios.post(`${ENDPOINT}/user/onboard`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  async signIn(payload){
    const response = await axios.post(`${ENDPOINT}/user/auth`, payload);
    return response;
  }

  async googleLogin(payload) {
    try {
      const response = await axios.post(
        `${ENDPOINT}/user/auth/google`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async finalizeGoogleRegistration(userData) {
    try {
      const response = await axios.post(
        `${ENDPOINT}/user/auth/google-finalize`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthDataServices();
