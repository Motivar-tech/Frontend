import axiosInstance from '../utils/axiosInstance';

class ChatService {
  async startChat() {
    try {
      const response = await axiosInstance.post('/chat/start', {});
      return response.data;
    } catch (error) {
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

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'An error occurred');
    }
    return new Error('Network error');
  }
}

const chatService = new ChatService();
export default chatService;
