document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('defaultModalButton').onclick = () => {
    document.getElementById('defaultModal').style.display = 'block'
  };
  document.getElementById('close').onclick = () => {
    document.getElementById('defaultModal').style.display = 'none'
  }
});
let content= document.getElementById('content')
let post= document.getElementById('post')
content.oninput=()=>{
  if(content.value.trim() != ''){
    post.style.opacity='1'
    post.style.cursor='pointer'
  }
  else{
    post.style.opacity='0.25'
  }
}
