import { createApp } from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload';

import errorImage from './assets/error-image.png';
import loadingImage from './assets/loading-image.gif';

const app = createApp(App);

app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImage,
  loading: loadingImage,
  attempt: 1
});

app.mount('#app');