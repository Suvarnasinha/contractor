export const mutations = {
  SET_USER(state, email) {
    state.email = email;
    console.log("the mutation data for password",email)
  },

  SET_USERDETAIL(state, email) {
    state.email = email;
    console.log("the mutation data for user",state.email)
  },

  SET_PASSWORD(state, email) {
    state.email = email;
    console.log("the mutation data for password",email)
  },

 SET_ROLE(state,role){
  state.role=role;
  console.log("the mutation data for role",state.role)

 }

}