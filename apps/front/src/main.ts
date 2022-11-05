import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./plugins/router";

import "./index.css";

const app = createApp(App).use(router);
app.mount("#app");
