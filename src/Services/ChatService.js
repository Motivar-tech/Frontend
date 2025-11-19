import axios from 'axios';
import { BASE_URL } from '../utils/index';

const ENDPOINT = BASE_URL;

class ChatService {
  getHeaders() {
    const token = localStorage.getItem('motivar-token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async startChat() {
    try {
      const response = await axios.post(
        `${ENDPOINT}/chat/start`,
        {},
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendMessage(sessionId, message) {
    try {
      const response = await axios.post(
        `${ENDPOINT}/chat/${sessionId}/message`,
        { user_msg: message },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'An error occurred');
    }
    return new Error('Network error');
  }
}

const chatService = new ChatService();
export default chatService;
