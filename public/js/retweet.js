const retweet = async (tweetId, icon, status, time) => {
  let temp;
  let form = new FormData();
  form.append('tweetId', tweetId);
  let res = await fetch('/retweetData', {
    method: 'POST',
    body: new URLSearchParams(form)
  })
  let data = await res.json();
  if (data.error) {
    return alert(error);
  }
  else {
    if (data.isRetweeted != 0) {
      status = 'undo';
    }
    else {
      status = 'retweet'
    }
  }
  if (status == 'retweet') {
    temp = Date.now();
    let retweetBox = icon.parentElement.nextSibling;
    retweetBox.setAttribute('id', temp);
    retweetBox.innerHTML = `
  <div id="${temp + 1}" class=" absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[184px] ">
  <ul class=" text-sm text-gray-700  aria-labelledby="dropdownDefaultButton">
      <li>
      <div id="${temp + 5}" class="z-30 bg-white cursor-pointer rounded-lg text-center flex p-3 shadow-2xl" style="height:52px; width:147px;margin-left: -125px;
      margin-top: -10px;" >
      <a class="my-auto" >
          <svg class="text-center h-7 w-6" fill="black" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" stroke="currentColor"
          viewBox="0 0 24 24">
              <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>   
      </a>
      <span class="px-2  py-auto">
          <p id="${temp + 2}" class="font-bold text-black size-10">Repost</p>
      </span>
  </div>
      </li>
      <li>
      <div id="${temp + 3}" class="z-30 bg-white cursor-pointer rounded-lg text-center flex hover:bg-gray-400 p-3 shadow-2xl" style="height:52px; width:147px;margin-left: -125px;
      margin-top: -10px;
   >
      <a class="my-auto" >
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 128" class="h-7 w-6">    <path d="M 79.335938 15.667969 C 78.064453 15.622266 76.775 15.762109 75.5 16.099609 C 72.1 16.999609 69.299609 19.199219 67.599609 22.199219 L 64 28.699219 C 63.2 30.099219 63.699609 32.000781 65.099609 32.800781 L 82.400391 42.800781 C 82.900391 43.100781 83.400391 43.199219 83.900391 43.199219 C 84.200391 43.199219 84.399219 43.199609 84.699219 43.099609 C 85.499219 42.899609 86.1 42.399219 86.5 41.699219 L 90.199219 35.199219 C 91.899219 32.199219 92.4 28.700781 91.5 25.300781 C 90.6 21.900781 88.400391 19.100391 85.400391 17.400391 C 83.525391 16.337891 81.455078 15.744141 79.335938 15.667969 z M 60.097656 38.126953 C 59.128906 38.201172 58.199219 38.724609 57.699219 39.599609 L 27.5 92 C 24.1 97.8 22.200781 104.30039 21.800781 110.90039 L 21 123.80078 C 20.9 124.90078 21.5 125.99961 22.5 126.59961 C 23 126.89961 23.5 127 24 127 C 24.6 127 25.199219 126.8 25.699219 126.5 L 36.5 119.40039 C 42 115.70039 46.7 110.8 50 105 L 80.300781 52.599609 C 81.100781 51.199609 80.599219 49.3 79.199219 48.5 C 77.799219 47.7 75.899609 48.199609 75.099609 49.599609 L 44.800781 102 C 41.900781 106.9 37.899609 111.20039 33.099609 114.40039 L 27.300781 118.19922 L 27.699219 111.30078 C 27.999219 105.60078 29.699609 100 32.599609 95 L 62.900391 42.599609 C 63.700391 41.199609 63.200781 39.3 61.800781 38.5 C 61.275781 38.2 60.678906 38.082422 60.097656 38.126953 z M 49 121 C 47.3 121 46 122.3 46 124 C 46 125.7 47.3 127 49 127 L 89 127 C 90.7 127 92 125.7 92 124 C 92 122.3 90.7 121 89 121 L 49 121 z M 104 121 A 3 3 0 0 0 101 124 A 3 3 0 0 0 104 127 A 3 3 0 0 0 107 124 A 3 3 0 0 0 104 121 z"/></svg>
      </a>
      <span class="px-2  py-auto">
          <p  class="font-bold text-black size-10">Quote</p>
      </span>
  </div>
      </li>
  </ul>
</div>
  `;

    icon.setAttribute('data-modal-toggle', temp);
    icon.setAttribute('data-modal-target', temp);
    let directRetweet = document.getElementById(temp + 5);
    let removeRepostBox = document.getElementById('removeRepostBox');
    removeRepostBox.style.display = 'block';
    removeRepostBox.onclick = () => {
      retweetBox.childNodes[1].style.display = "none";
      removeRepostBox.style.display = "none";
    }
    directRetweet.addEventListener('click', async () => {
      retweetBox.childNodes[1].style.display = "none";
      removeRepostBox.style.display = "none";
      let form = new FormData();
      form.append('tweetId', tweetId);
      form.append('action', 'repost')
      let response = await fetch('/retweet', {
        method: 'POST',
        body: new URLSearchParams(form)
      })
      let { error, msg } = await response.json();
      if (error) {
        return alert('Error:' + error);
      }
      else {
        alert(msg);
        let retweetCount = document.getElementById(tweetId + 'tweet');
        if (retweetCount.innerText == "") {
          icon.style.color = '#2563eb';
          retweetCount.innerText = 1;
          retweetCount.style.color = '#2563eb';
        } else {
          retweetCount.innerText = parseInt(retweetCount.innerText) + 1;
          icon.style.color = '#2563eb';
          retweetCount.style.color = '#2563eb';
        }
      }
    })
  }
  else if (status == "undo") {
    temp = Date.now();
    let retweetBox = icon.parentElement.nextSibling;
    retweetBox.setAttribute('id', temp);
    retweetBox.innerHTML = `
  <div id="${temp + 1}" class=" absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[184px]  ">
  <ul class=" text-sm text-gray-700  aria-labelledby="dropdownDefaultButton">
      <li>
      <div id='${temp + 6}' class="z-30 bg-white cursor-pointer rounded-lg text-center flex  hover:bg-slate-300  p-3 shadow-2xl" style="height:52px; width:147px; margin-left: -125px;
      margin-top: -10px;" >
      <a class="my-auto" >
          <svg class="text-center h-7 w-6" fill="black" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" stroke="currentColor"
          viewBox="0 0 24 24">
              <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>   
      </a>
      <span class="px-2  py-auto">
          <p id="${temp + 2}" class="font-bold text-black size-10">Undo repost</p>
      </span>
  </div>
      </li>
      <li>
      <div id='${temp + 3}' class="z-30 bg-white cursor-pointer rounded-lg text-center flex hover:bg-gray-400 p-3 shadow-2xl" style="height:52px; width:147px;margin-left: -125px;
      margin-top: -10px;" >
      <a class="my-auto" >
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 128" class="h-7 w-6">    <path d="M 79.335938 15.667969 C 78.064453 15.622266 76.775 15.762109 75.5 16.099609 C 72.1 16.999609 69.299609 19.199219 67.599609 22.199219 L 64 28.699219 C 63.2 30.099219 63.699609 32.000781 65.099609 32.800781 L 82.400391 42.800781 C 82.900391 43.100781 83.400391 43.199219 83.900391 43.199219 C 84.200391 43.199219 84.399219 43.199609 84.699219 43.099609 C 85.499219 42.899609 86.1 42.399219 86.5 41.699219 L 90.199219 35.199219 C 91.899219 32.199219 92.4 28.700781 91.5 25.300781 C 90.6 21.900781 88.400391 19.100391 85.400391 17.400391 C 83.525391 16.337891 81.455078 15.744141 79.335938 15.667969 z M 60.097656 38.126953 C 59.128906 38.201172 58.199219 38.724609 57.699219 39.599609 L 27.5 92 C 24.1 97.8 22.200781 104.30039 21.800781 110.90039 L 21 123.80078 C 20.9 124.90078 21.5 125.99961 22.5 126.59961 C 23 126.89961 23.5 127 24 127 C 24.6 127 25.199219 126.8 25.699219 126.5 L 36.5 119.40039 C 42 115.70039 46.7 110.8 50 105 L 80.300781 52.599609 C 81.100781 51.199609 80.599219 49.3 79.199219 48.5 C 77.799219 47.7 75.899609 48.199609 75.099609 49.599609 L 44.800781 102 C 41.900781 106.9 37.899609 111.20039 33.099609 114.40039 L 27.300781 118.19922 L 27.699219 111.30078 C 27.999219 105.60078 29.699609 100 32.599609 95 L 62.900391 42.599609 C 63.700391 41.199609 63.200781 39.3 61.800781 38.5 C 61.275781 38.2 60.678906 38.082422 60.097656 38.126953 z M 49 121 C 47.3 121 46 122.3 46 124 C 46 125.7 47.3 127 49 127 L 89 127 C 90.7 127 92 125.7 92 124 C 92 122.3 90.7 121 89 121 L 49 121 z M 104 121 A 3 3 0 0 0 101 124 A 3 3 0 0 0 104 127 A 3 3 0 0 0 107 124 A 3 3 0 0 0 104 121 z"/></svg>
      </a>
      <span class="px-2  py-auto">
          <p  class="font-bold text-black size-10">Quote</p>
      </span>
  </div>
      </li>
  </ul>
</div>
  `;

    icon.setAttribute('data-modal-toggle', temp);
    icon.setAttribute('data-modal-target', temp);
    let directRetweet = document.getElementById(temp + 6);
    let removeRepostBox = document.getElementById('removeRepostBox');
    removeRepostBox.style.display = 'block';
    removeRepostBox.onclick = () => {
      retweetBox.childNodes[1].style.display = "none";
      removeRepostBox.style.display = "none";
    }
    directRetweet.addEventListener('click', async () => {
      retweetBox.childNodes[1].style.display = "none";
      removeRepostBox.style.display = "none";
      let form = new FormData();
      form.append('tweetId', tweetId);
      form.append('action', 'undo')
      let response = await fetch('/retweet', {
        method: 'POST',
        body: new URLSearchParams(form)
      })
      let { error, msg } = await response.json();
      if (error) {
        return alert('Error:' + error);
      }
      else {
        let retweetCount = document.getElementById(tweetId + 'tweet');
        alert(msg);
        if (retweetCount.innerText == 1) {
          icon.style.color = '#6b7280';
          retweetCount.innerText = "";
          retweetCount.style.color = '#6b7280';
        } else {
          retweetCount.innerText = parseInt(retweetCount.innerText) - 1;
          icon.style.color = '#6b7280';
          retweetCount.style.color = '#6b7280';
        }
      }
    })
  }
  let quote = document.getElementById(temp + 3);
  quote.addEventListener('click', async () => {
    let post = document.getElementById('post');
    let retweetBox = icon.parentElement.nextSibling;
    let removeRepostBox = document.getElementById('removeRepostBox');
    retweetBox.childNodes[1].style.display = "none";
    removeRepostBox.style.display = "none";
    let tweetGenerator = document.getElementById('defaultModal');
    let tweetedBox = document.getElementById('tweetedBox');
    let profile_imgTag = document.getElementById('profile_img');
    tweetGenerator.style.display = "block";
    post.style.opacity = '1'
    post.style.cursor = 'pointer'
    let response = await fetch('/tweetPost/displayImage/?id=' + tweetId, {
      method: 'GET'
    })
    let data = await response.json();
    let profileImg;
    fetch('/tweetPost/profileImage', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then(profile => {
        profileImg = profile.profileImg;
        if (profileImg) {
          profile_imgTag.setAttribute('src', "/uploads/" + profileImg)
        } else {
          profile_imgTag.setAttribute('src', "/assets/userProfile.png")
        }
      })
    let tweetedString;
    tweetedString = `
    <div style="border:1px solid lightgray;border-radius:25px">
      <div class="flex flex-shrink-0 p-4 pb-0">
      <input id="forRetweet" type="hidden" value=${tweetId}>
        <a class="flex-shrink-0 group block">
          <div class="flex items-center">
            <div>`;
    if (data.user.profile_img_url) {
      tweetedString += `<img class="inline-block h-10 w-10 rounded-full" src="/uploads/${data.user.profile_img_url}" alt="" />`
    } else {
      tweetedString += `<img class="inline-block h-10 w-10 rounded-full" src="/assets/profile.png" alt="" />`
    }

    tweetedString += `</div>
                  <div class="ml-3">
                    <p class="text-base leading-6 font-medium text-black">
                    ${data.user.name}
                        <span
                            class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            @ ${data.user.username} . ${time}
                        </span>
                    </p>
                </div>
          </div>
        </a>
      </div>
        <div class="flex flex-shrink-0 p-4 pb-0">
          <div>
            <a>
              <p class="text-base width-auto font-medium"
                        style="word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">
                        ${data.draftContent}
              </p>`;
    if (data.image) {
      tweetedString +=
        `<div class="size-fit pr-6 pt-3 mb-3">
                  <div>
                    <img style="height:140px;width:270px"  src="/uploads/${data.image.media_url}" alt="" />
                  </div>
                </div>`;
    }
    tweetedString +=
      `</a>
          </div>
        </div>
    </div>`;
    tweetedBox.innerHTML = tweetedString;
  })
}



