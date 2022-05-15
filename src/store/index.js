import { createStore } from "vuex";

//Importing the coaches modues
import coachesModule from './modules/coaches/index.js';
import requestModules from './modules/request/index';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        request: requestModules,
        auth: authModule
    },
});

export default store;