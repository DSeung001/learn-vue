import { defineStore } from "pinia";

export const useSimplificationStore = defineStore("simply", {
    state: () => ({
        simply: false
    }),
    getters: {
        getSimply(state) {
            return state.simply;
        }
    },
    actions: {
        setSimply(data){
            this.simply = data
        }
    }
});