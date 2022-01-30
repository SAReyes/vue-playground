import axios from "axios";

const configureAxios = (): void => {
  axios.defaults.baseURL = "https://api.thecatapi.com/v1";
  axios.defaults.headers.common["x-api-key"] = process.env.VUE_APP_CAT_API_KEY;
};

export default configureAxios;
