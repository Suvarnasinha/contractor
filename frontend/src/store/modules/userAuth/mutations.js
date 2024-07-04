export const mutations = {

  SET_USERDETAIL(state, email) {
    state.email = email;
    console.log("the mutation data for user",state.email)
  },

  SET_PASSWORD(state, email) {
    state.email = email;
    console.log("the mutation data for password",email)
  }
}