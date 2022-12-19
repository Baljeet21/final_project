import {createApp} from "vue/dist/vue.esm-bundler";
import {createRouter, createWebHashHistory} from "vue-router";
import Soundboard from "./pages/soundboard.vue"
import Guesser from "./pages/Guesser.vue"

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    {path: '/soundboard', component: Soundboard},
    {path: '/guesser', component: Guesser}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, //  short for routes: routes
})

const app = createApp({})
app.use(router)
app.mount('#app')
