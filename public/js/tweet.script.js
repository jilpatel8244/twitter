
let content = document.getElementById('content');
let post = document.getElementById('post');
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
  console.log(draftTweet.length);
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
  console.log(draftTweet);
  let number = 1;
  draftTweet.forEach(draft => {

    list += `<li>
    <label for="draftRow${number}"  class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer draftList hover:text-gray-900 hover:bg-gray-100 " onclick='sendDraft(${draft.id} , "${draft.content}")'>
      <div class="flex" >
        <input type="checkbox" id="draftRow${number}" name="draftRow${number}" class="hidden" />
        <input type="text" id="${draft.id}" class="hidden" />
        <div class="w-full text-lg px-2 font-semibold select-none">${draft.content}</div>
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

const sendDraft = async (tweetId, tweetContent) => {
  hiddenId.value = tweetId;
  alert(hiddenId.value);
  let response = await fetch('/tweetPost/displayImage/?id=' + tweetId, {
    method: 'GET'
  })
  let { image, error } = await response.json();
  if (error) {
    return alert(error);
  }
  if (image != undefined) {
    let { media_url } = image;
    images.innerHTML = '<img class="w-[25rem] h-[25rem] m-2" src="./uploads/' + media_url + '">';
  }
  document.getElementById('select-modal').style.display = 'none';
  content.value = tweetContent;
  post.style.opacity = '1'
  post.style.cursor = 'pointer'
}

const tweetUpdate = async (action) => {
  if (content.value.trim() != '' || images.childNodes[0].tagName == 'IMG') {
    let form = new FormData(document.forms[0]);
    form.append('action', action);
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
    document.getElementById('defaultModal').style.display = 'none'
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
        console.log(unSelected);
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
  alert(msg);
  selectAll.innerText = 'Select all';
  document.getElementById('delete-modal').style.display = 'none';
  document.getElementById('select-modal').style.display = 'block';
  editDraft.innerText = 'Edit'
  deleteBlock.style.display = 'none'
  displayDraft();
  deselect();
}