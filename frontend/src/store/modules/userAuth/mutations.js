export const mutations = {
  SET_USER(state, email) {
    state.email = email;
    console.log("the mutation data for password",email)
  },

  SET_USERDETAIL(state, payload) {
    console.log("payload",payload);
    state.email = payload.email;
    state.role=payload.role
    state.token = payload.token;
    localStorage.setItem("token",payload.token);
    localStorage.setItem("role",payload.role)
    state.LogIn=true
    console.log("the mutation data for user",state.email)
    console.log("the mutation data for user role",state.role)
  },

  SET_PASSWORD(state, email) {
    state.email = email;
    console.log("the mutation data for password",email)
  },

  SET_AUTH(state, payload) {
    state.token = payload.token;
    state.role = payload.role;
    state.LogIn=true
  },
}