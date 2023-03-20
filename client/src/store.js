import Vue from "Vue";
import { defineStore } from 'pinia'

import user from './stores/user'

export const useUserStore = defineStore('user', {
  modules:{
    user
  }
    // other options...
  })