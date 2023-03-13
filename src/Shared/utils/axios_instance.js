import axios from "axios";
// TODO: change token

const Axios = axios.create({
  baseURL: "https://api-production-d8a3.up.railway.app",
  // timeout: 10000,
  validateStatus: function (status) {
    if(status == 200){
      return true
    }
    if(status == 403){
      localStorage.clear()
      window.location.replace("/login")
    } 
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
  },
});

export default Axios;