import axiosInstance from '../utils/axiosInstance';

class RecService {
  async getRecommendations() {
    try {
      const response = await axiosInstance.post('/recommendations', {});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data?.message || 'An error occurred');
    }
    return new Error('Network error');
  }
}

const recService = new RecService();
export default recService;
