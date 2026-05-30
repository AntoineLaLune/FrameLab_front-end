import { createApp } from "vue";
import App from "./app-router.vue";
import router from "./router.ts";

createApp(App).use(router).mount("#app");
