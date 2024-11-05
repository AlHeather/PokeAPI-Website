
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from './store'

const store = createStore();

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
