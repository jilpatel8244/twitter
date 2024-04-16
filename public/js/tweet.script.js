let content = document.getElementById('content')
let post = document.getElementById('post')
let save = document.getElementById('save')
let discard = document.getElementById('discard');
let media = document.getElementById('media')
let images = document.getElementById('images')
document.addEventListener("DOMContentLoaded", function (event) {

  document.getElementById('defaultModalButton').onclick = () => {
    clearImages();
    document.getElementById('defaultModal').style.display = 'block'
    content.focus();
  };
  
});
document.getElementById('close').onclick = () => {
  if(images.childNodes[0] != undefined){
    if (content.value.trim() != '' || images.childNodes[0].tagName == 'IMG') {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
    }
  }
  else{
    if (content.value.trim() != '') {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
    }
  }
}
content.oninput = () => {
  if (content.value.trim() != '') {
    post.style.opacity = '1'
    post.style.cursor = 'pointer'
  }
  else {
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
  }
}
const tweetInsert = async (status) => {
  if (content.value.trim() != '' && images.childNodes[0].tagName == 'IMG') {
    var form = new FormData(document.forms['tweet']);
    const response = await fetch('/tweetPost/insertTweet/?status=' + status, {
      method: 'POST',
      body: new URLSearchParams(form)
    })
    let { msg, error } = await response.json();
    if (msg) {
      alert(msg)
    }
    if (error) { alert(error) }
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
    clearImages();
    document.getElementById('defaultModal').style.display = 'none'
    document.forms['tweet'].reset();
  }
}
post.onclick = () => {
  tweetInsert('tweet')
}

save.onclick = () => {
  tweetInsert('draft')
  clearImages();
  document.getElementById('popup-modal').style.display = 'none'
  document.getElementById('defaultModal').style.display = 'none';
  post.style.opacity = '0.25'
  post.style.cursor = 'default'
}

discard.onclick = () => {
  document.getElementById('popup-modal').style.display = 'none'
  document.getElementById('defaultModal').style.display = 'none';
  clearImages();
  post.style.opacity = '0.25'
  post.style.cursor = 'default'
  document.forms['tweet'].reset();
}

media.onchange = () => {
  getImages();
  alert(images.childNodes[0].tagName);
  if (content.value.trim() != '' || images.childNodes[0].tagName == 'IMG') {
    post.style.opacity = '1'
    post.style.cursor = 'pointer'
  }
  else {
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
  }
}
const getImages = () => {
  const files = media.files;
  var photos = "";
  for (let i = 0; i < files.length; i++) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[i]);
    fileReader.addEventListener('load', function () {
      post.style.opacity = '1'
      post.style.cursor = 'pointer'
      // console.log(this.result);
      photos += '<img src="' + this.result + '"/>'
      images.style.display = 'block';
      images.innerHTML = photos
    });
  }

}
const clearImages = () => {
  images.innerHTML = "";
}