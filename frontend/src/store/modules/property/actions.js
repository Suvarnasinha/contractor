// export const actions={
//   async addProperty({commit},{name,address,description}){
//     try {
//       const response =await fetch('http://localhost:3000/addproperty',{
//         method:'POST',
//         credentials:"include",
//         headers:{
//           'Content-Type': 'application/json',
//         },
//         body:JSON.stringify({name,address,description})
//       });
//       console.log("response data",response)
//       if(response.ok){
//         console.log("asfeegdrgr")
//         const setProperty=await response.json();
//      console.log("sertryryutuytuiuo",setProperty)
//         commit('SET_PROPERTY',setProperty.name)
//         console.log("login successful")
//       }
//     } catch (error) {
//       console.error("erreor in fetching the users",error)
//     }
//   },

//     async fetchProperties({ commit }) {
//       try {
//         const response = await fetch('http://localhost:3000/showproperty',{
//           credentials:"include",
//         });
//         const properties = await response.json();
//         commit('SHOW_PROPERTY', properties);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     },

//     async propertywork({commit},{formData,property}){
//       // console.log(formData);
//       try {
//         const response =await fetch(`http://localhost:3000/addwork/${property}`,{
//           method:'POST',
//           credentials:"include",
//           body:formData
//         });
//         // console.log("response data",response)
//         if(response.ok){
//           // console.log("object",property);
//           await response.json();
//       //  console.log("set work",setProperty)
//           commit('SET_PROPERTYWORK',formData)
//           // console.log("form submitted successful")
//         }
//       } catch (error) {
//         console.error("erreor in fetching the users",error)
//       }
//     },
  
  
// }

export const actions = {
  async addProperty({ commit }, { name, address, description }) {
    try {
      const response = await fetch('http://localhost:3000/addproperty', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, description })
      });

      if (response.ok) {
        const setProperty = await response.json();
        commit('SET_PROPERTY', setProperty.name);
      }
    } catch (error) {
      console.error("Error in fetching the users", error);
    }
  },

  async fetchProperties({ commit }) {
    try {
      const response = await fetch('http://localhost:3000/showproperty', {
        credentials: 'include',
      });
      const properties = await response.json();
      commit('SHOW_PROPERTY', properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  },
    async propertywork({commit},{formData,property}){
      // console.log(formData);
      try {
        const response =await fetch(`http://localhost:3000/addwork/${property}`,{
          method:'POST',
          credentials:"include",
          body:formData
        });
        // console.log("response data",response)
        if(response.ok){
          // console.log("object",property);
          await response.json();
      //  console.log("set work",setProperty)
          commit('SET_PROPERTYWORK',formData)
          // console.log("form submitted successful")
        }
      } catch (error) {
        console.error("erreor in fetching the users",error)
      }
    },
};