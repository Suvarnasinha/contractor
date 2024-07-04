import { createStore } from 'vuex';

export default createStore({
  state: {
    currentPropertyId: null,
    proofOfWork: {
      description: '',
      images: [],
    },
  },
  mutations: {
    SET_CURRENT_PROPERTY_ID(state, propertyId) {
      state.currentPropertyId = propertyId;
    },
    SET_PROOF_DESCRIPTION(state, description) {
      state.proofOfWork.description = description;
    },
    ADD_PROOF_IMAGE(state, image) {
      state.proofOfWork.images.push(image);
    },
    RESET_PROOF_WORK(state) {
      state.proofOfWork.description = '';
      state.proofOfWork.images = [];
    },
  },
  actions: {
    async submitProofOfWork({ state }) {
      try {
        const { currentPropertyId, proofOfWork } = state;
        const formData = new FormData();
        formData.append('propertyid', currentPropertyId);
        formData.append('description', proofOfWork.description);
        proofOfWork.images.forEach(image => {
          formData.append('images', image);
        });

        const response = await fetch('http://localhost:3000/submitproof', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          console.log('Proof of work submitted successfully');
          // Reset proof of work form after successful submission
          commit('RESET_PROOF_WORK');
        } else {
          console.error('Failed to submit proof of work');
        }
      } catch (error) {
        console.error('Error submitting proof of work:', error);
      }
    },
  },
});
