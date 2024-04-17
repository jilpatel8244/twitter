let content = document.getElementById('content')
let post = document.getElementById('post')
let save = document.getElementById('save')
let discard = document.getElementById('discard');
let media = document.getElementById('media')
let images = document.getElementById('images')
let drafts = document.getElementById('drafts');
let draftList = document.getElementById('draftList');
let closeDraft=document.getElementById('closeDraft');
document.addEventListener("DOMContentLoaded", function (event) {

  document.getElementById('defaultModalButton').onclick = () => {
    clearImages();
    document.getElementById('defaultModal').style.display = 'block'
    content.focus();
  };

});
document.getElementById('close').onclick = () => {
  if (images.childNodes[0] != undefined) {
    if (content.value.trim() != '' || images.childNodes[0].tagName == 'IMG') {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
    }
  }
  else {
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
  if (content.value.trim() != '' || images.childNodes[0].tagName == 'IMG') {
    let contentText = content.value;
    let form = new FormData();
    form.append('content', contentText);
    form.append('media', media.files[0]);
    const response = await fetch('/tweetPost/insertTweet/?status=' + status, {
      method: 'POST',
      body: form
    })
    let { msg, error } = await response.json();
    if (msg == 'Inserted') {
      window.location.href = '/home';
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
  let photos = "";
  for (let i = 0; i < files.length; i++) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[i]);
    fileReader.addEventListener('load', function () {
      post.style.opacity = '1'
      post.style.cursor = 'pointer'
      // console.log(this.result);
      photos += '<img class="w-[25rem] h-[25rem] m-2" src="' + this.result + '"/>'
      images.style.display = 'block';
      images.innerHTML = photos
    });
  }

}
const clearImages = () => {
  images.innerHTML = "";
}

drafts.onclick = () => {
  document.getElementById('select-modal').style.display = 'block';
  displayDraft();
}

const displayDraft = async () => {
  let url = window.location.origin + '/tweetPost/displayDrafts';
  const response = await fetch(url, ({
    method: 'GET',
  }))
  const { draftTweet, error } = await response.json();
  if (error) {
    return alert(error);
  }
  let list = ""
  if (!draftTweet.length) {
    return;
  }
  draftTweet.forEach(darft => {
    list += `<li onclick=sendDraft(${darft})>
    <input type="checkbox" id="job-1" name="job" value="job-1" class="hidden peer" required />
    <label for="job-1" class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
      <div class="block" >
        <div class="w-full text-lg font-semibold">${darft.content}</div>
      </div>
    </label>
  </li>`
  });
  draftList.innerHTML = list;
}

closeDraft.onclick=()=>{
  document.getElementById('select-modal').style.display = 'none';
}

const sendDraft = (draft) =>{
  alert('here')
  document.getElementById('select-modal').style.display = 'none';
  content.value=draft.content;
}