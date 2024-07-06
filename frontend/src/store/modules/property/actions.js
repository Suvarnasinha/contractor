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
      try {
        const response = await fetch(`http://localhost:3000/addwork/${propertyId}`, {
          method: 'POST',
          credentials: "include",
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
    
    
  
  
}