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
import contractorChat from './components/contractorChat.vue'
import showWorkContractor from './components/showWorkContractor.vue'
import PropertyChatPeople from './components/PropertyChatPeople.vue'
import propertyChat from './components/propertyChat.vue'
import payment from './components/payment.vue'
import paymentDetails from './components/paymentDetails.vue'
import archiveProperty from './components/archiveProperty.vue'
import archivedContractor from './components/archivedContractor.vue'
import archivedComments from './components/archivedComments.vue'
import showConStatus from './components/showConStatus.vue'

import {store} from './store'

const routes = [
  {
    name:'Registration',
    path: '/register',
    component: registration,
  },
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
    meta: { requiredAuth: true },
  },
  {
    name:'propertyWork',
    path: '/propertyWork/:propertyId',
    component: propertywork,
    meta: { requiredAuth: true },
  },
  {
    name:'showProperty',
    path:'/showproperty',
    component:showProperty,
    meta: { requiredAuth: true },
  },
  {
    name:'propertyContList',
    path:'/propertylist',
    component:propertyContList,
    meta: { requiredAuth: true },
  },
  {
    name:'estimateForm',
    path:'/estimateForm',
    component:estimateForm,
    meta: { requiredAuth: true },
  },
  {
    name:'propertyShowEstimate',
    path:'/propertyShowEstimate',
    component:propertyShowEstimate,
    meta: { requiredAuth: true },
  },
  {
    name:'estimateShow',
    path:'/estimateshow',
    component:estimateShow,
    meta: { requiredAuth: true },
  },
  {
    name:'proofWork',
    path:'/proofWork',
    component:proofWork,
    meta: { requiredAuth: true },
  },
  {
    name:'addProof',
    path:'/addProof',
    component:addProof,
    meta: { requiredAuth: true },
  },
  {
    name:'viewProof',
    path:'/viewProof',
    component:viewProof,
    meta: { requiredAuth: true },
  },
  {
    name:'viewComment',
    path:'/comments/:propertyId',
    component:viewComment,
    meta: { requiredAuth: true },
  },
  {
    name:'addComment',
    path:'/proof/details/:propertyId',
    component:addComment,
    meta: { requiredAuth: true },
  },
  {
    name:'propertiesShowComment',
    path:'/propertiesShowComment',
    component:propertiesShowComment,
    meta: { requiredAuth: true },
  },
  {
    name:'propertyDashboard',
    path:'/propertyDashboard',
    component:propertyDashboard,
    meta: { requiredAuth: true },
  },
  {
    name:'pagenotfound',
    path:'/:pathMatch(.*)*',
    component:PageNotFound

  },
  {
    name:'showStatus',
    path:'/showStatus',
    component:showStatus,
    meta: { requiredAuth: true },
  },
  {
    name:'showConStatus',
    path:'/showConStatus',
    component:showConStatus,
    meta: { requiredAuth: true },
  },
  {
    name:'showWork',
    path:'/showWork',
    component:showWork,
    meta: { requiredAuth: true },
  },
  {
    name:'contractorChat',
    path:'/contractorChat',
    component:contractorChat
  },
  {
    name:'showWorkContractor',
    path:'/showWorkContractor',
    component:showWorkContractor
  },
  {
    name:'PropertyChatPeople',
    path:'/PropertyChatPeople',
    component:PropertyChatPeople
  },
  {
    name:'propertyChat',
    path:'/propertyChat',
    component:propertyChat
  },
  {
    name:'payment',
    path:'/payment',
    component:payment
  },
  {
    name:'paymentDetails',
    path:'/paymentDetails',
    component:paymentDetails
  },
  {
    name:'archiveProperty',
    path:'/archiveProperty',
    component:archiveProperty
  },
  {
    name:'archivedContractor',
    path:'/archivedContractor',
    component:archivedContractor
  },
  {
    name:'archivedComments',
    path:'/proof/comment/:propertyId',
    component:archivedComments
  }

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if (
    to.name == "Login" || to.name == "Registration" || to.name == "forgetPassword" ) {
    next();
  } else {
    console.log("qwertyuioplkjhgf",store.state.userAuth.LogIn)
    if (!store.state.userAuth.LogIn) {
      console.log("object");
      console.log("data store here login",store.state.userAuth.LogIn);
      next({ path: "/" });
    } else {
      next();
    }
  }
});


