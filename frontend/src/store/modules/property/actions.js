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
  

    async updateEstimateStatus({ dispatch, commit }, { contractor_id,contractorworkid,status, propertyId }) {
      console.log("hellomoto",contractorworkid,contractor_id,status, propertyId)
      try {
        const response = await fetch(`http://localhost:3000/updateEstimateStatus`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractor_id,contractorworkid,status }),
        });
    
        if (response.ok) {
          commit('UPDATE_ESTIMATE_STATUS', 'success');
          await dispatch('fetchEstimate', { propertyId }); 
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

    async getCommentDescription({commit},{propertyId}){
console.log("add comment propertyID333333333333",propertyId)

      try {
        const response = await fetch(`http://localhost:3000/commentdescription/${propertyId}`,{
      credentials:'include'
    });
    const description = await response.json()
    console.log("description value",description)
    commit('GET_COMMENT_DESCRIPTION',description)
      } catch (error) {
        console.error('Error fetching comment description:', error);
        
      }
    },

    async submitCommentData({commit},{propertyId,comment}){
      console.log("submit comment data",propertyId,comment)
      try{
        const response = await fetch('http://localhost:3000/addcomment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ propertyId,comment }),
            });
            const commentValue = await response.json()
            if(response.ok){
              commit('SUBMIT_COMMENT',commentValue)
            }else{
              console.log("can not submit the data");
            }
      }catch (error) {
        console.error('Error fetching submitting the comment:', error);
        
      }
    },


    async showProperty({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/showProperties',{
          credentials:"include",
        });
        const showprop = await response.json();
        console.log("properties",showprop);
        commit('SHOW_PROPERTIES_DATA', showprop);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }, 

    async fetchWorkDetails({ commit }, propertyId) {
      try {
        const response = await fetch(`http://localhost:3000/showWork/${propertyId}`);
        const data = await response.json();
        commit('SET_WORK_DETAILS', data);
        return data;
      } catch (error) {
        console.error('Error fetching work details:', error);
      }
    },
    
    async propertyStatus({ commit }, propertyId){
      try{
        const response = await fetch(`http://localhost:3000/showStatus/${propertyId}`);
        const status=await response.json();
        console.log("statestatusaction",status.state);
        commit('SET_STATUS',status);
        return status;
      }catch(error){
        console.log(error);
      }
    }
}