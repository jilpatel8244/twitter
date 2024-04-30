let content = document.getElementById('content');
let post = document.getElementById('post');
let profileImgHolder = document.getElementById('profile_img')
let save = document.getElementById('save');
let discard = document.getElementById('discard');
let media = document.getElementById('media')
let images = document.getElementById('images')
let drafts = document.getElementById('drafts');
let draftList = document.getElementById('draftList');
let closeDraft = document.getElementById('closeDraft');
let hiddenId = document.getElementById('tweetId');
let editDraftBlock = document.getElementById('edit')
let editDraft = document.getElementById('editBtn');
let deleteBlock = document.getElementById('deleteBlock')
let selectAll = document.getElementById('selectAll')
let deleteBtn = document.getElementById('delete');
let deleteCancle = document.getElementById('deleteCancle');
let finalDelete = document.getElementById('finalDelete');
let emojiBtn = document.getElementById('emojiBtn');
let emojiPicker = document.getElementById('emojiPicker');
let allScreen = document.getElementById('allScreen');
let remover = document.getElementById('remover');
let tweetedBox=document.getElementById('tweetedBox');
var imgToRemove;
const removeImg = (id)=>{
  imgToRemove = document.getElementById(id);
  if(imgToRemove){
    imgToRemove.remove();
    
    media.value=null;
    let closeImg = document.getElementById('closeImg');
    closeImg.remove();
    imgToRemove = undefined;
    if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
      post.style.opacity = '1'
      post.style.cursor = 'pointer'
    }
    else {
      post.style.opacity = '0.25'
      post.style.cursor = 'default'
    }
  }
}
document.addEventListener("DOMContentLoaded", function (event) {

  document.getElementById('defaultModalButton').onclick = () => {
    clearImages();
    document.getElementById('defaultModal').style.display = 'block';
    getProfileImage();
    content.focus();
  };
});


document.getElementById('close').onclick = () => {
  if (imgToRemove != undefined) {
    if (content.innerText.trim() != '' || imgToRemove != undefined ) {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
      tweetedBox.innerHTML="";
      post.style.opacity = '0.25'
      post.style.cursor = 'default'
    }
  }
  else {
    if (content.innerText.trim() != '') {
      document.getElementById('popup-modal').style.display = 'block'
    } else {
      document.getElementById('defaultModal').style.display = 'none';
      tweetedBox.innerHTML=""
      post.style.opacity = '0.25';
    post.style.cursor = 'default';
    }
  }
}
content.oninput = () => {
  if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
    post.style.opacity = '1'
    post.style.cursor = 'pointer'
  }
  else {
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
  }
}

const getProfileImage = () => {
  fetch('/tweetPost/profileImage', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then(profile => {
      let profileImg = profile.profileImg;
      if (profileImg) {
        profileImgHolder.setAttribute('src', "/uploads/" + profileImg)
      } else {
        profileImgHolder.setAttribute('src', "/assets/userProfile.png")
      }
    })
}
let removeEmoji = document.getElementById('removeEmoji');

emojiBtn.onclick = () => {
  removeEmoji.style.display = 'block';
  emojiPicker.innerHTML = `<emoji-picker tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-[500px] backdrop-blur-sm rounded-t-md md:inset-0  pt-25 max-h-full" style="left: 40%;width: 400px;height: 400px;top:98%" ></emoji-picker>`;
  document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
      let emoji = event.detail.unicode;
      content.innerText += emoji;
      if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
        post.style.opacity = '1'
        post.style.cursor = 'pointer'
      }
      else {
        post.style.opacity = '0.25'
        post.style.cursor = 'default'
      }
    });
}

removeEmoji.addEventListener('click', () => {
  emojiPicker.innerHTML= '';
  if( emojiPicker.innerHTML==''){
    removeEmoji.style.display='none';
  }
})

const tweetInsert = async (status) => {
  if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
    let contentText = content.innerText;
    if(contentText.trim() == "" && tweetedBox.innerHTML != ""){

    }
    if(tweetedBox.innerHTML != ""){
      let forRetweet = document.getElementById('forRetweet');
      alert(forRetweet.value);
    }
    let form = new FormData();
    form.append('content', contentText);
    form.append('media', media.files[0] || []);
    const response = await fetch('/tweetPost/insertTweet/?status=' + status, {
      method: 'POST',
      body: form
    })
    let { msg, error } = await response.json();
    if (msg == 'Inserted') {
      window.location.href = '/home';
    }
    if (error) { return alert(error) }
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
    clearImages();
    document.getElementById('defaultModal').style.display = 'none'
    document.forms['tweet'].reset();
    tweetedBox.innerHTML = "";
  }
}
post.onclick = () => {
  if (hiddenId.value != '') {
    tweetUpdate('tweet')
  }
  else {
    tweetInsert('tweet')
  }
}

save.onclick = () => {
  if (hiddenId.value != '') {
    tweetUpdate('draft')
    hiddenId.value = "";
  }
  else {
    tweetInsert('draft')
  }
  clearImages();
  document.getElementById('popup-modal').style.display = 'none'
  document.getElementById('defaultModal').style.display = 'none';
  post.style.opacity = '0.25'
  post.style.cursor = 'default'
  document.forms['tweet'].reset();
  tweetedBox.innerHTML = "";
}
discard.onclick = () => {
  document.getElementById('popup-modal').style.display = 'none'
  document.getElementById('defaultModal').style.display = 'none';
  clearImages();
  post.style.opacity = '0.25'
  post.style.cursor = 'default'
  document.forms['tweet'].reset();
  tweetedBox.innerHTML = "";
}

media.onchange = () => {
  getImages();
  if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
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
      post.style.opacity = '1';
      post.style.cursor = 'pointer';
      let temp = Date.now();
      photos += `
      <div class='relative w-fit'>
      <img id='${temp}' style="height:200px;width:170px" class="m-2" src="${this.result}"/>
      <div id="closeImg"  class='absolute' style="right: 9px;top: 3px;" onclick="removeImg('${temp}')">
      <p class="text-white hover:bg-gray-600 bg-black  cursor-pointer  rounded-3xl text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="${temp}" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
      <span class="sr-only">Close modal</span>
      </p>
      </div>`
      images.style.display = 'block';
      images.innerHTML = photos
      imgToRemove=document.getElementById(temp)
    });
  }
}

const clearImages = () => {
  images.innerHTML = "";
  content.innerText = '';
}

drafts.onclick = () => {
  document.getElementById('select-modal').style.display = 'block';
  displayDraft();
  tweetedBox.innerHTML = "";
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
  if (draftTweet.length == 0) {
    draftList.innerHTML = `<li>
    <p class="text-black text-2xl">Hold that thought</p> 
    <p class="text-gray-800"> Not ready to post just yet? Save it to your drafts or schedule it for later. </p>
  </li>`;
    editDraftBlock.style.display = 'none';
    return;
  }
  else {
    editDraftBlock.style.display = 'block';
  }
  let number = 1;
  draftTweet.forEach(async (draft) => {

    list += `<li>
    <label for="draftRow${number}"  class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer draftList hover:text-gray-900 hover:bg-gray-100 " onclick='sendDraft(${draft.id})'>
      <div class="flex" >
        <input type="checkbox" id="draftRow${number}" name="draftRow${number}" class="hidden" />
        <input type="text" id="${draft.id}" value="" class="hidden" />
        <div class="flex justify-between ">
        <div class="w-full text-lg px-2 font-semibold select-none text-balance max-w-80 overflow-hidden">${draft.content == "" ? "" : draft.content}</div>
        </div>
      </div>
      <div>
        ${draft.media_url ? "<img class='h-16 w-16' src='/uploads/" + draft.media_url + "'>" : ""}
        </div>
    </label>
  </li>`;
    number++;
  });
  draftList.innerHTML = list;
}

closeDraft.onclick = () => {
  document.getElementById('select-modal').style.display = 'none';
  selectAll.innerText = 'Select all'
  deleteBlock.style.display = 'none';
  deleteBtn.disabled = true;
  deleteBtn.style.cursor = 'default';
  deleteBtn.classList.remove('hover:bg-red-100');
  deleteBtn.classList.add('disabled:opacity-70');
  if (editDraft.innerText == 'Done') {
    editDraft.innerText = 'Edit'
    for (let i = 0; i < checksForDelete.length; i++) {
      checksForDelete[i].style.display = 'none'
    }
    for (let i = 0; i < draftList.length; i++) {
      draftList[i].setAttribute('onclick', list[i]);
      draftList[i].style.cursor = 'pointer';
    }
  }
}

const sendDraft = async (tweetId) => {
  hiddenId.value = tweetId;
  let response = await fetch('/tweetPost/displayImage/?id=' + tweetId , {
    method: 'GET'
  })
  let { image, error, draftContent } = await response.json();
  if (error) {
    return alert(error);
  }
  var temp;
  if (image != undefined) {
    let { media_url } = image;
    temp=Date.now();
    images.innerHTML = `
    <div class='relative w-fit'>
    <img id='${temp}' style="height:200px;width:170px" class="m-2" src="/uploads/${media_url}"/>
    <div id="closeImg"  class='absolute' style="right: 9px;top: 9px;" onclick="removeImg('${temp}')">
    <p class="text-white hover:bg-gray-600 bg-black  cursor-pointer  rounded-3xl text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="${temp}" >
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
    <span class="sr-only">Close modal</span>
    </p>
    </div>`
  }
  document.getElementById('select-modal').style.display = 'none';
  content.innerText = draftContent;
  post.style.opacity = '1'
  post.style.cursor = 'pointer'
  imgToRemove=document.getElementById(temp);
}

const tweetUpdate = async (action) => {
  
  if (content.innerText.trim() != '' || imgToRemove != undefined || tweetedBox.innerHTML != "") {
    let form = new FormData(document.forms[0]);
    form.append('content', content.innerText);
    form.append('action', action);
    form.append('isImg',imgToRemove || null);
    const response = await fetch('/tweetPost/tweetUpdate', {
      method: 'POST',
      body: form
    })
    let { msg, error } = await response.json();
    if (error) {
      return alert(error);
    }
    if (msg == 'Updated') {
      window.location.href = '/home'
    }
    post.style.opacity = '0.25'
    post.style.cursor = 'default'
    clearImages();
    document.getElementById('defaultModal').style.display = 'none';
    tweetedBox.innerHTML = "";
  }
}

var list = [];
var unSelected = []
editDraft.onclick = () => {
  let draftList = document.querySelectorAll('.draftList');
  let checksForDelete = document.querySelectorAll('input[type=checkbox]')
  let deleteBtn = document.getElementById('delete');
  if (editDraft.innerText == 'Edit') {
    editDraft.innerText = 'Done'
    for (let i = 0; i < checksForDelete.length; i++) {
      checksForDelete[i].style.display = 'block'
      unSelected.push(checksForDelete[i]);
    }
    for (let i = 0; i < draftList.length; i++) {
      list[i] = draftList[i].getAttribute('onclick');
      draftList[i].setAttribute('onclick', "");
      draftList[i].style.cursor = 'default';
    }
    deleteBlock.style.display = 'block'
    checksForDelete.forEach(checks => {
      checks.addEventListener('change', (e) => {
        if (e.target.checked) {
          selectAll.innerText = 'Deselect all';
          if (unSelected.indexOf(e.target) != -1) unSelected.splice(unSelected.indexOf(e.target), 1);
          deleteBtn.disabled = false
          deleteBtn.style.cursor = 'pointer'
          deleteBtn.classList.add('hover:bg-red-100')
          deleteBtn.classList.remove('disabled:opacity-70')
        }
      })
      checks.addEventListener('change', () => {
        if (!checks.checked) {
          unSelected.push(checks);
        }
        if (checksForDelete.length == unSelected.length) {
          selectAll.innerText = 'Select all';
          deleteBtn.disabled = true
          deleteBtn.style.cursor = 'default'
          deleteBtn.classList.remove('hover:bg-red-100')
          deleteBtn.classList.add('disabled:opacity-70')
        }
        if (unSelected.length == 0) {
          selectAll.innerText = 'Deselect all';
        }

      })
    })

  }

  else if (editDraft.innerText == 'Done') {
    editDraft.innerText = 'Edit'
    selectAll.innerText = 'Select all';
    deselect();
    for (let i = 0; i < checksForDelete.length; i++) {
      checksForDelete[i].style.display = 'none'
    }
    for (let i = 0; i < draftList.length; i++) {
      draftList[i].setAttribute('onclick', list[i]);
      draftList[i].style.cursor = 'pointer';
    }
    deleteBlock.style.display = 'none';
  }
}

selectAll.onclick = () => {
  if (selectAll.innerText == 'Select all') {
    selectAll.innerText = 'Deselect all';
    selectAllChecks()
  }
  else {
    selectAll.innerText = 'Select all';
    deselect();
  }
}

const deselect = () => {
  let checksForDelete = document.querySelectorAll('input[type=checkbox]');
  let deleteBtn = document.getElementById('delete');

  unSelected = []
  checksForDelete.forEach(checks => {
    if (checks.checked) {
      checks.checked = false;
    }
    unSelected.push(checks);
    deleteBtn.disabled = true
    deleteBtn.style.cursor = 'default'
    deleteBtn.classList.remove('hover:bg-red-100')
    deleteBtn.classList.add('disabled:opacity-70')
  })

}

const selectAllChecks = () => {
  let checksForDelete = document.querySelectorAll('input[type=checkbox]');
  let deleteBtn = document.getElementById('delete');
  unSelected = [];
  for (let i = 0; i < checksForDelete.length; i++) {
    if (!checksForDelete[i].checked) {
      checksForDelete[i].checked = true;
    }
    deleteBtn.disabled = false
    deleteBtn.style.cursor = 'pointer'
    deleteBtn.classList.add('hover:bg-red-100')
    deleteBtn.classList.remove('disabled:opacity-70')
  }
}


deleteBtn.onclick = () => {
  document.getElementById('delete-modal').style.display = 'block';
}

deleteCancle.onclick = () => {
  document.getElementById('delete-modal').style.display = 'none';
}

finalDelete.onclick = async () => {
  let checksForDelete = document.querySelectorAll('input[type=checkbox]');
  let deleteBtn = document.getElementById('delete');
  let draftId = []
  checksForDelete.forEach(checks => {
    if (checks.checked) {
      draftId.push(checks.nextElementSibling.getAttribute('id'));
    }
  })
  var formsData = new FormData();
  formsData.append('deleteDraft', draftId);
  let response = await fetch('/tweetPost/draftDelete', {
    method: 'POST',
    body: new URLSearchParams(formsData)
  })
  let { msg, error } = await response.json();
  if (error) {
    alert(error);
    deselect();
    document.getElementById('delete-modal').style.display = 'none';
  }
  selectAll.innerText = 'Select all';
  document.getElementById('delete-modal').style.display = 'none';
  document.getElementById('select-modal').style.display = 'block';
  editDraft.innerText = 'Edit'
  deleteBlock.style.display = 'none'
  displayDraft();
  deselect();
}
const editImg = () => {

}
