/* eslint-disable */

import axios from "axios";
import { BASE_URL } from '../utils/index';

const ENDPOINT = BASE_URL;

class AuthDataServices {
  async signUp(payload) {
    const response = await axios.post(`${ENDPOINT}/user/onboard`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  async signIn(payload) {
    const response = await axios.post(`${ENDPOINT}/user/auth`, payload);
    return response;
  }

  async resendVerificationCode(payload) {
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
    const response = await axios.post(`${ENDPOINT}/user/auth/google`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  async finalizeGoogleRegistration(userData) {
    const response = await axios.post(`${ENDPOINT}/user/auth/google-finalize`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  async refreshToken(refreshToken) {
    const response = await axios.post(`${ENDPOINT}/user/auth/refresh`, { refreshToken });
    return response;
  }

  async logout(refreshToken) {
    const token = localStorage.getItem("motivar-token");
    await axios.post(
      `${ENDPOINT}/user/auth/logout`,
      { refreshToken },
      { headers: { Authorization: `Bearer ${token}` } }
    ).catch(() => {});
    localStorage.removeItem("motivar-token");
    localStorage.removeItem("motivar-refresh-token");
    localStorage.removeItem("motivar-user-role");
  }

  async forgotPassword(email) {
    const response = await axios.post(`${ENDPOINT}/user/forgot-password`, { email });
    return response;
  }

  async resetPassword(token, userId, newPassword) {
    const response = await axios.post(`${ENDPOINT}/user/reset-password`, {
      token,
      userId,
      newPassword,
    });
    return response;
  }
}

export default new AuthDataServices();
