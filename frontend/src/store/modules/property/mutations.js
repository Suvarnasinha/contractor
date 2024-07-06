export const mutations={
  SET_PROPERTY(state, name) {
    state.name = name;
    console.log("the mutation data for user",state.name)
  },
  SHOW_PROPERTY(state,property){
    state.property=property;
    console.log("the mutation data for user",state.property)
  },
  SET_PROPERTYWORK(state,property){
    state.property=property;
    console.log("the mutation data for the property work",state.property)
  }

}