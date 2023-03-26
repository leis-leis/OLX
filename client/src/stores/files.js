import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({
    files: [],
  }),
  getters: {

  },
  actions: {
        addFiles (payload){
            this.files = payload
        }
    },
  },
);
