import axios from 'axios';
import { BASE_URL } from '../utils/index';

const ENDPOINT = BASE_URL;

class RecService {
  getHeaders() {
    const token = localStorage.getItem('motivar-token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async getRecommendations() {
    try {
      const response = await axios.post(
        `${ENDPOINT}/recommendations`,
        {},
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

const recService = new RecService();
export default recService;
