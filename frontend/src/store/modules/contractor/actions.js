export const actions={
  async fetchContProperties({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/showpropertycont',{
        credentials:"include",
      });
      const properties = await response.json();
      console.log("properties",properties);
      commit('SHOW_PROPERTY', properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  },


  async submitEstimateData({commit},{propertyid,estimate,time}){
    try {
      const response =await fetch('http://localhost:3000/submitestimate',{
        method:'POST',
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
          },
        body:JSON.stringify({propertyid,estimate,time}),
      });
      console.log("response data",response)
      if(response.ok){
        console.log("asfeegdrgr")
        const estimate=await response.json();
        commit('SUBMIT_ESTIMATE',estimate)

        console.log("login successful and has been set successful");
        console.log("login successful")
      }
    } catch (error) {
      console.error("erreor in fetching the users",error)
    }
  },


  async fetchPropertiesComment({commit}){
    try {
      const response = await fetch('http://localhost:3000/getCommentProperties',{
        credentials:"include"
      });
      const properties = await response.json();
      console.log("properties",properties);
      commit('FETCH_PROPERTY_COMMENT', properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      
    }
  },


  async fetchPaymentDetails({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/getPayment',{
        credentials:"include"

      });
      const paymentDetails = await response.json();
      commit('SET_PAYMENT_DETAIL', paymentDetails);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  },

  async contractorStatus({ commit }, propertyId){
    try{
      const response = await fetch(`http://localhost:3000/showConStatus/${propertyId}`);
      const status=await response.json();
      console.log("statestatusaction",status.state);
      commit('SET_STATUS_CON',status);
      return status;
    }catch(error){
      console.log(error);
    }
  }
}