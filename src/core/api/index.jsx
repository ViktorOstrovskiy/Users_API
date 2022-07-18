import axios from "axios";

const axiosConfig = {
  baseURL: "http://topdevsprojects.org:8081/tasks/",
};

const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
  async (res) => res,
  (err) => {
    throw err;
  }
);

const API = instance;

export { API };
