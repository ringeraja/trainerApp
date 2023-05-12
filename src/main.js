import { createApp ,defineAsyncComponent} from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
//import BaseDialog from './components/ui/BaseDialog.vue'; async cmp
import GreenCube from './components/ui/GreenCube.vue';
import TheMenu from './components/layout/TheMenu.vue';
import ExerciseCmp from './components/layout/ExerciseCmp.vue';

const BaseDialog = defineAsyncComponent( () => import('./components/ui/BaseDialog.vue'));

//console.log('ucitali main.js');


const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card',BaseCard);
app.component('base-button',BaseButton);
app.component('base-badge',BaseBadge);
app.component('base-spinner',BaseSpinner);
app.component('base-dialog',BaseDialog);
app.component('green-cube',GreenCube);
app.component('the-menu',TheMenu);
app.component('exercise-cmp',ExerciseCmp);

app.mount('#app');
