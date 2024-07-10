export const actions= {
  async register({commit},{name,email,phonenumber,address,usertype,password}){
    console.log("forjdfkdhgiksdfghikh",)
    try {
      const response =await fetch('http://localhost:3000/registration',{
        method:'POST',
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
          },
        body:JSON.stringify({name,email,phonenumber,address,usertype,password}),
      });
      console.log("response data",response)
      if(response.ok){
        console.log("asfeegdrgr")
        const register=await response.json();
        console.log("fordata::::",register);
        commit('SET_USER',register.email)
        console.log("login successful");
        
      }
    } catch (error) {
      console.error("erreor in fetching the users",error)
    }
  },


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
        const login=await response.json();
        console.log("asdfdsgdgdgdfgfgfgdfgfeegdrgr",login)
        await commit('SET_USERDETAIL',login)
        console.log("login successful and cookie has been set successful");
        // console.log("login successful")
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
