import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
//import BaseDialogue from './components/ui/BaseDialog.vue';

const BaseDialogue = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

const app = createApp(App);

app.use(router);
app.use(store);

//The Base Component
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialogue', BaseDialogue);


app.mount('#app');
//createApp(App).mount('#app')
