import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

export const getAuthUrl = async () => {
  const res = axios.get(`${base_url}/user/login`);
  return res;
};

export const getAuthStatus = async (id_token: string) => {
  const res = axios.post(`${base_url}/user/authenticated`, {
    id_token: id_token,
  });
  return res;
};
