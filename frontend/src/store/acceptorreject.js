import { createStore } from 'vuex';

const store = createStore({
  state: {
    properties: [],
    estimates: []
  },
  mutations: {
    SET_PROPERTIES(state, properties) {
      state.properties = properties;
    },
    SET_ESTIMATES(state, estimates) {
      state.estimates = estimates;
    }
  },
  actions: {
    async fetchProperties({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        commit('SET_PROPERTIES', data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    async fetchEstimates({ commit }, propertyId) {
      try {
        const response = await fetch(`http://localhost:3000/estimates/${propertyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch estimates');
        }
        const data = await response.json();
        commit('SET_ESTIMATES', data);
      } catch (error) {
        console.error('Error fetching estimates:', error);
      }
    },
    async updateEstimateStatus({ commit }, { contractorworkid, status }) {
      try {
        const response = await fetch('http://localhost:3000/estimate/status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractorworkid, status }),
          credentials: 'include', // Include credentials if using cookies for authentication
        });
        if (!response.ok) {
          throw new Error('Failed to update estimate status');
        }
        console.log('Estimate status updated successfully');
      } catch (error) {
        console.error('Error updating estimate status:', error);
      }
    }
  }
});

export default store;






//rouert
import { createRouter, createWebHistory } from 'vue-router';
import PropertyList from '../views/PropertyList.vue';
import Estimates from '../views/Estimates.vue';

const routes = [
  {
    path: '/',
    name: 'PropertyList',
    component: PropertyList
  },
  {
    path: '/estimates/:propertyId',
    name: 'Estimates',
    component: Estimates
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
