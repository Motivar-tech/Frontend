/* eslint-disable */

import axios from "axios";
import { BASE_URL } from '../utils/index'
const ENDPOINT = BASE_URL;
//const ENDPOINT = "http://localhost:8089";

class AuthDataServices {
  async signUp(payload) {
    const response = await axios.post(`${ENDPOINT}/user/onboard`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async signIn(payload) {
    const response = await axios.post(`${ENDPOINT}/user/auth`, payload);
    return response;
  }

  async resendVerificationCode(payload) {
    // payload: { email }
    const response = await axios.post(`${ENDPOINT}/user/resend-otp`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  async updateProfile(token, data) {
    const response = await axios.patch(`${ENDPOINT}/user/profile/update`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async googleLogin(payload) {
    try {
      const response = await axios.post(
        `${ENDPOINT}/user/auth/google`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthDataServices();
