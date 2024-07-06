import { createStore } from "vuex";
import { userAuth } from './modules/userAuth/userAuth';
import { property } from "./modules/property/property";
import { contractor } from "./modules/contractor/contractor";

export const store =createStore({
  modules: {
    userAuth,
    property,
    contractor
  }})