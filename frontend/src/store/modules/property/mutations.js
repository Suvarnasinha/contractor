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
  },
  SHOW_ESTIMATE(state,estimate){
    state.estimate=estimate;
    console.log("the mutation data for ESTIMATE",state.estimate)
  },
  SHOW_PROPERTY_ESTIMATE(state,estimateProperty){
    state.estimateProperty=estimateProperty;
    console.log("the mutation data for estimateProperty",state.estimateProperty)
  },

  UPDATE_ESTIMATE_STATUS(state, status) {
    state.updateStatus = status;
    console.log("the mutation data for estimateProperty",state.status)
  },
  SHOW_ESTIMATE_PROPERTY(state,properties){
    state.properties=properties;
    console.log("the mutation data for the property work",state.properties)
  },
  GET_COMMENT_DESCRIPTION(state,description){
    state.description=description;
    console.log("the mutation data for GET_COMMENT_DESCRIPTION",state.description)
  },
  SUBMIT_COMMENT(state,comment){
    state.comment=comment;
    console.log("the mutation data for the submit comment",state.comment);
  },

  SHOW_PROPERTIES_DATA(state,showprop){
    state.showprop=showprop;
    console.log("the mutation data for the submit comment",state.showprop);
  },
  SET_WORK_DETAILS(state, workDetails) {
    state.workDetails = workDetails;
    console.log("the mutation data for the submit comment",state.workDetails);

  }
}