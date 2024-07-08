export const actions={
  async addProperty({commit},{name,address,description}){
    try {
      const response =await fetch('http://localhost:3000/addproperty',{
        method:'POST',
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,address,description})
      });
      console.log("response data",response)
      if(response.ok){
        console.log("asfeegdrgr")
        const setProperty=await response.json();
     console.log("sertryryutuytuiuo",setProperty)
        commit('SET_PROPERTY',setProperty.name)
        console.log("login successful")
      }
    } catch (error) {
      console.error("erreor in fetching the users",error)
    }
  },

    async fetchProperties({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/showproperty',{
          method:'GET',
          credentials:"include",
        });
        const properties = await response.json();
        commit('SHOW_PROPERTY', properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },

    async propertywork({ commit }, { formData, propertyId }) {
      console.log(formData)
      try {
        const response = await fetch(`http://localhost:3000/addwork/${propertyId}`, {
          method: 'POST',
          credentials: "include",
          'Content-Type': 'multipart/form-data' ,
          body: formData, 
        });
    
        if (response.ok) {
          const data = await response.json();
          commit('SET_PROPERTYWORK', data);
          console.log("Form submitted successfully");
        } else {
          console.error("Error in response:", response.statusText);
        }
      } catch (error) {
        console.error("Error in fetching the users:", error);
      }
    }, 
    
 // Frontend action to fetch estimates for a property

  async fetchEstimate({ commit }, { propertyId }) {
    console.log("PROPROPEOAAAAAAAAAAAAAAAA",propertyId)
    try {
      const response = await fetch('http://localhost:3000/getestimate', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId }), 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const estimate = await response.json();
      console.log("a",estimate)
      commit('SHOW_ESTIMATE', estimate);
    } catch (error) {
      console.error('Error fetching estimates:', error);
    }
  },




///////to show to property all the estimated property
    async fetchProEstimate({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/fetchPropertyEstimate',{
          method:'GET',
          credentials:"include",
        });
        const estimateProperty = await response.json();
        console.log("qwerty",estimateProperty)
        commit('SHOW_PROPERTY_ESTIMATE', estimateProperty);
      } catch (error) {
        console.error('Error fetching estimate:', error);
      }
    },
  

    async updateEstimateStatus({ dispatch, commit }, { contractorworkid, status, propertyId }) {
      console.log("hellomoto",contractorworkid, status, propertyId)
      try {
        const response = await fetch(`http://localhost:3000/updateEstimateStatus`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractorworkid, status }),
        });
    
        if (response.ok) {
          commit('UPDATE_ESTIMATE_STATUS', 'success');
          await dispatch('fetchEstimate', { propertyId }); // Refetch the estimates to get the updated list
        } else {
          commit('UPDATE_ESTIMATE_STATUS', 'failed');
        }
      } catch (error) {
        commit('UPDATE_ESTIMATE_STATUS', 'error');
        console.error('Error updating estimate status:', error);
      }
    },




    async fetchContProperties({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/showAllPropertyContEstimation',{
          credentials:"include",
        });
        const properties = await response.json();
        console.log("properties",properties);
        commit('SHOW_ESTIMATE_PROPERTY', properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    
}