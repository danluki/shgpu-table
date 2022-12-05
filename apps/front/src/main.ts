import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./plugins/router";
import { MotionPlugin } from "@vueuse/motion";
import "./index.css";

const app = createApp(App).use(router).use(MotionPlugin);
app.mount("#app");
