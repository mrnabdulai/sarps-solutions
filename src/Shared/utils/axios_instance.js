import axios from "axios";
// TODO: change token

const Axios = axios.create({
  baseURL: "https://api-production-d8a3.up.railway.app",
  // timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
  },
});

export default Axios;