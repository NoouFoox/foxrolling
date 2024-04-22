import { App } from "vue"
import RollComponent from "../components/RollComponent.vue";

export { RollComponent }

export default {
  install(app: App) {
    app.component("RollComponent", RollComponent);
  },
};
