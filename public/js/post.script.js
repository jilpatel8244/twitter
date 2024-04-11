document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('defaultModalButton').onclick = () => {
    document.getElementById('defaultModal').style.display = 'block'
  };
  document.getElementById('close').onclick = () => {
    document.getElementById('defaultModal').style.display = 'none'
    document.forms['tweet'].reset();
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
    post.style.cursor='default'

  }
}

post.onclick=async()=>{
  if(content.value.trim() != ''){
    const response= await fetch('/tweetPost/insertTweet',{
      method:'POST',
      body: new URLSearchParams(new FormData(document.forms['tweet']))
    })
    let  {msg,error} = await response.json();
    if(msg){
      alert(msg)
    }
    if(error){alert(error)}
    document.getElementById('defaultModal').style.display = 'none'
    document.forms['tweet'].reset();
  }
}