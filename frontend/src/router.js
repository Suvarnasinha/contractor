import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import PageNotFound from './components/PageNotFound.vue'
import forgetPassword from './components/forgetPassword.vue'
import propertywork from './components/propertywork.vue'
import propertyDisplay from './components/propertyDisplay.vue'
import showProperty from './components/showProperty.vue'
import propertyContList from './components/propertyContList.vue'
import estimateForm from './components/estimateForm.vue'
import propertyShowEstimate from './components/propertyShowEstimate.vue'
import estimateShow from './components/estimateShow.vue'
import registration from './components/registration.vue'
import proofWork from './components/proofWork.vue'
import addProof from './components/addProof.vue'
import viewProof from './components/viewProof.vue'
import viewComment from './components/viewComment.vue'
import addComment from './components/addComment.vue'
import propertiesShowComment from './components/propertiesShowComment.vue'
import propertyDashboard from './components/propertyDashboard.vue'
import showStatus from './components/showStatus.vue'
import showWork from './components/showWork.vue'
const routes = [
  {
    name:'Registration',
    path: '/',
    component: registration,
  },
  {
    name:'Login',
    path: '/login',
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
    name:'propertyContList',
    path:'/propertylist',
    component:propertyContList,
  },
  {
    name:'estimateForm',
    path:'/estimateForm',
    component:estimateForm,
  },
  {
    name:'propertyShowEstimate',
    path:'/propertyShowEstimate',
    component:propertyShowEstimate,
  },
  {
    name:'estimateShow',
    path:'/estimateshow',
    component:estimateShow,
  },
  {
    name:'proofWork',
    path:'/proofWork',
    component:proofWork,
  },
  {
    name:'addProof',
    path:'/addProof',
    component:addProof,
  },
  {
    name:'viewProof',
    path:'/viewProof',
    component:viewProof,
  },
  {
    name:'viewComment',
    path:'/comments/:propertyId',
    component:viewComment,
  },
  {
    name:'addComment',
    path:'/proof/details/:propertyId',
    component:addComment,
  },
  {
    name:'propertiesShowComment',
    path:'/propertiesShowComment',
    component:propertiesShowComment,
  },
  {
    name:'propertyDashboard',
    path:'/propertyDashboard',
    component:propertyDashboard,
  },
  {
    name:'pagenotfound',
    path:'/:pathMatch(.*)*',
    component:PageNotFound
  },
  {
    name:'showStatus',
    path:'/showStatus',
    component:showStatus
  },
  {
    name:'showWork',
    path:'/showWork',
    component:showWork
  }

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.name == 'Login'){
//    next();
//   }

// else{
//   if(store.getters.getToken){
//     console.log("token has been set ")
//     next()
//   }
//   else{
//     console.log("go to login");
//     next({ path: '/'})
//   }
// }
// })  

