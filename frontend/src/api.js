import axios from "axios";                              //http client

const API = axios.create({                              //axios object
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {                  //attach jwt to req
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;                                       //other files can use API
