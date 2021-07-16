import { getIP, getVisitors, groupList } from '../services/api.service';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ip:'',
    visitors: [],
    grouped: { options: { labels: [], series: [] } },
  },
  getters: {
    ip: (state) => state.ip,
    visitors:(state) => state.visitors,
    grouped:(state) => state.grouped,
  },
  mutations: {
    setGrouped(state, grouped) {
      grouped.options = {
        labels: grouped.map(x => x.ip),
        series: grouped.map(x => x.amount),
      };
      state.grouped = grouped;
    },
    setVisitors:(state,visitors) => state.visitors = visitors,
    setIP:(state, ip) => state.ip = ip
    
  },
  actions: {
    async fetchIP({ commit }) {
     let ip = await getIP();
     commit('setIP', ip.ip);
    },

    async fetchVisitors({ commit }) {
      let visitors = await getVisitors();
      commit('setVisitors', visitors);
    },

    async fetchGrouped({ commit }) {
      let grouped = await groupList();
      commit('setGrouped', grouped);
    }
  },
})
