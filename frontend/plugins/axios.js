// frontend/plugins/axios.js
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api", //backend api url
  });

  nuxtApp.provide("axios", axiosInstance);
});
