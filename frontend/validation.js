export function hasNumber(value){
  if(value!=""){
    console.log("validation value:",value);
    return(/\D/.test(value))?false:true
  }
  return true;
  }
