import { createApp } from "vue"
import App from "./App.vue"
// import store from "./store";

import { setupStore } from "./store"
import router, { setupRouter } from "./router"
import { setupNaive } from "@/plugins"

// createApp(App).use(store).use(router).mount("#app");

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  // 注册全局常用的 naive-ui 组件
  setupNaive(app)
  setupRouter(app)

  await router.isReady()

  const meta = document.createElement("meta")
  meta.name = "my-go-admin"
  document.head.appendChild(meta)

  app.mount("#app", true)
}

void bootstrap()
