import axios from "axios";

export const $axios = axios.create({
  // baseURL: "https://api-rest-phi.vercel.app/"
  baseURL: "http://localhost:3333",
});

