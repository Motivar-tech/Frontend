import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL } from '../utils';

// The /chat/guest/* endpoints ignore auth entirely — claiming is the only bridge
// between a guest session and an account. axiosInstance attaches a stored
// Authorization header automatically, so guest calls go through a bare client.
const guestClient = axios.create({ baseURL: BASE_URL });

class ChatService {
  // ── Logged-in chat ────────────────────────────────────────────────────────
  async startChat() {
    try {
      const response = await axiosInstance.post('/chat/start', {});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Rehydrates the panel on load. Returns null when the user has never chatted
  // (the backend answers 404), which is an empty panel and not an error.
  async getSession() {
    try {
      const response = await axiosInstance.get('/chat/session');
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw this.handleError(error);
    }
  }

  async sendMessage(sessionId, message) {
    try {
      const response = await axiosInstance.post(
        `/chat/${sessionId}/message`,
        { user_msg: message }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ── Guest (pre-account) chat ──────────────────────────────────────────────
  async startGuestChat() {
    try {
      const response = await guestClient.post('/chat/guest/start');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendGuestMessage(sessionId, message, guestToken) {
    try {
      const response = await guestClient.post(
        `/chat/guest/${sessionId}/message`,
        { user_msg: message },
        { headers: { 'x-guest-token': guestToken } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Needs a real auth token *and* the guest token: copies the guest's answers
  // onto the account and converts the session into the account's live chat.
  async claimGuestChat(guestToken) {
    try {
      const response = await axiosInstance.post(
        '/chat/guest/claim',
        {},
        { headers: { 'x-guest-token': guestToken } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    const status = error.response?.status;
    // The chat controllers answer with { error: "..." }, the rate limiters and
    // auth middleware with { message: "..." } — read both so the real reason
    // reaches the UI. `error` is only a string on the controller paths (the auth
    // middleware sends an object), so it is used only when it is one.
    const data = error.response?.data;
    const detail = data?.message || (typeof data?.error === 'string' ? data.error : null);
    const err = new Error(detail || (status ? 'An error occurred' : 'Network error'));
    err.status = status;
    err.data = error.response?.data;
    return err;
  }
}

const chatService = new ChatService();
export default chatService;
