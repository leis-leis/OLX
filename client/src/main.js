import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router.js";
//import user from './stores/user'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { VueReCaptcha } from "vue-recaptcha-v3";

const pinia = createPinia();
createApp(App).use(pinia).use(router).use(VueReCaptcha, { siteKey: '6LcoNSclAAAAAMp31HqLBEv5Rb6SryUPsVoRBADp' }).mount("#app");
