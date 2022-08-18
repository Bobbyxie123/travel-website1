import axios, { AxiosError } from "axios";


const baseURL = "http://123.56.149.216:8080";

const instance = axios.create({
  baseURL,
  headers: {
    "x-icode": "35BA1CCF08E2ABE6",
  },
});


instance.interceptors.response.use(
    (response) => {
      return response;
    })


export default instance;


