import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

export const getAuthUrl = async () => {
  const res = axios.get(`${base_url}/user/login`);
  return res;
};
