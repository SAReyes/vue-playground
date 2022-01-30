import { createApp } from "vue";
import App from "./App.vue";
import configureAxios from "@/infrastructure/configureAxios";

configureAxios();

createApp(App).mount("#app");
