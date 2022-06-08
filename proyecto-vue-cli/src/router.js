import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import Formulario from './components/Formulario.vue'
import Resultados from './components/Resultados.vue'

Vue.use(VueRouter)


export const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', redirect: '/helloworld' },
        { path: '/helloworld', component: HelloWorld },
        { path: '/formulario', component: Formulario },
        { path: '/resultados', component: Resultados }
        
    ]
})