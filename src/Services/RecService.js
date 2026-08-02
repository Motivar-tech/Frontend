import axiosInstance from '../utils/axiosInstance';

class RecService {
  // Returns { recommendations, regenerated }. `regenerated: true` means a fresh
  // retrieve + rerank ran (several seconds); `false` means the cache was served.
  async getRecommendations() {
    try {
      const response = await axiosInstance.post('/recommendations', {});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    const status = error.response?.status;
    // The recommender answers with { error: "…" } (e.g. "Profile is incomplete…"),
    // rate limiters and auth middleware with { message: "…" } — and the latter's
    // `error` is an object, so only take `error` when it is a string.
    const data = error.response?.data;
    const detail = data?.message || (typeof data?.error === 'string' ? data.error : null);
    const err = new Error(detail || (status ? 'An error occurred' : 'Network error'));
    err.status = status;
    err.data = data;
    return err;
  }
}

const recService = new RecService();
export default recService;
