let content = document.getElementById('content')
let post = document.getElementById('post')
let save = document.getElementById('save')
let discard = document.getElementById('discard');
document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('defaultModalButton').onclick = () => {
    document.getElementById('defaultModal').style.display = 'block'
    content.focus();
  };
  document.getElementById('close').onclick = () => {
    if (content.value.trim() != '') {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
    }
  }
});
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
  if (content.value.trim() != '') {
    const response = await fetch('/tweetPost/insertTweet/?status=' + status, {
      method: 'POST',
      body: new URLSearchParams(new FormData(document.forms['tweet']))
    })
    let { msg, error } = await response.json();
    if (msg) {
      alert(msg)
    }
    if (error) { alert(error) }
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
    document.getElementById('defaultModal').style.display = 'none'
    document.forms['tweet'].reset();
  }
}
post.onclick = () => {
  tweetInsert('tweet')
}

save.onclick = () => {
  tweetInsert('draft')
  document.getElementById('popup-modal').style.display = 'none'
}

discard.onclick = () => {
  document.getElementById('popup-modal').style.display = 'none'
  document.getElementById('defaultModal').style.display = 'none';
  document.forms['tweet'].reset();
}