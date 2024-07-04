import { createStore } from "vuex";
import { userAuth } from './modules/userAuth/userAuth';
import { property } from "./modules/property/property";

export const store =createStore({
  modules: {
    userAuth,
    property
  }})