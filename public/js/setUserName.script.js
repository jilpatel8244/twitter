let setBtn= document.getElementById('set');
let validate = () =>{
  let form = document.forms['setUserName'];
  if(form['username'].value.trim() == ''){
    alert('Please enter user name');
    return false;
  }
  return true;
}
setBtn.onclick = ()=>{
  let valid=validate();
  if(valid){
    
  }
  else{
    
  }
}