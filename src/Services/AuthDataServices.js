/* eslint-disable */

import axios from "axios";
import { BASE_URL } from '../utils/index';
import axiosInstance from '../utils/axiosInstance';

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
    // Called with a freshly issued token that may not be in localStorage yet
    // (Step-3 sign-in flow), so the token is passed explicitly rather than
    // relying on axiosInstance's localStorage-backed interceptor.
    const response = await axiosInstance.patch(`/user/profile/update`, data, {
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
    await axiosInstance.post(`/user/auth/logout`, { refreshToken }).catch(() => {});
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
