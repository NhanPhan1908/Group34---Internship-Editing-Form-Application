import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/login", // API backend
});

export default instance;