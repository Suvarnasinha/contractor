export const mutations={
  SHOW_PROPERTY(state,property){
    state.property=property;
    console.log("the mutation data for user",state.property)
  },
  SUBMIT_ESTIMATE(state,estimate){
    state.estimate=estimate;
    console.log("the mutation data for user",state.estimate)
  }
}