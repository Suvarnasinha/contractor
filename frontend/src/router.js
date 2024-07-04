import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import PageNotFound from './components/PageNotFound.vue'
import forgetPassword from './components/forgetPassword.vue'
import propertywork from './components/propertywork.vue'
import propertyDisplay from './components/propertyDisplay.vue'
import showProperty from './components/showProperty.vue'
import properrtylist from './component/properrtylist.vue';
import estimate from './component/estimate.vue';
const routes = [
  {
    name:'Login',
    path: '/',
    component: Login,
  },
  {
    name:'forgetPassword',
    path: '/forgetPassword',
    component: forgetPassword,
  },
  {
    name:'propertyDisplay',
    path: '/addproperty',
    component: propertyDisplay,
  },
  {
    name:'propertyWork',
    path: '/propertyWork/:propertyId',
    component: propertywork,
  },
  {
    name:'showProperty',
    path:'/showproperty',
    component:showProperty,
  },
  {
    name:'pagenotfound',
    path:'/:pathMatch(.*)*',
    component:PageNotFound
  },
  {
    path: '/propertylist',
    name: 'PropertyList',
    component: properrtylist
  },
  {
    path: '/estimate/:propertyId',
    name: 'EstimateForm',
    component: estimate
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


