export const actions= {
  async login({commit},{email,password}){
    try {
      const response =await fetch('http://localhost:3000/login',{
        method:'POST',
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
          },
        body:JSON.stringify({email,password}),
      });
      console.log("response data",response)
      if(response.ok){
        console.log("asfeegdrgr")
        const login=await response.json();
        commit('SET_USERDETAIL',login.email)
        // document.cookie = `token=${login.token};secure `;
        console.log("login successful and has been set successful");
        console.log("login successful")
      }
    } catch (error) {
      console.error("erreor in fetching the users",error)
    }
  },


  async forgetPassword({commit},{email,password}){
    try {
      const response =await fetch('http://localhost:3000/forgetpassword',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password})
      });
      console.log("response data",response)
      if(response.ok){
        console.log("asfeegdrgr")
        const forgetPassword=await response.json();
     console.log("email_dataforget",forgetPassword)
        commit('SET_PASSWORD',forgetPassword.email)
        console.log("login successful")
      }
    } catch (error) {
      console.error("erreor in fetching the users",error)
    }
  }
  }
