/* eslint-disable */

import axios from "axios";
const ENDPOINT = "https://motivar-sponsor-api-v1.onrender.com";


class AuthDataServices {
  async signUp(payload) {
    const response = await axios.post(`${ENDPOINT}/user/onboard`, payload);
    return response;
  }

  async signIn(payload){
    const response = await axios.post(`${ENDPOINT}/user/auth`, payload);
    return response;
  }
}

export default new AuthDataServices();
