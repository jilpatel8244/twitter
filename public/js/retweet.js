
const retweet = (tweetId, icon) => {
  let temp = Date.now();
  let retweetBox = icon.parentElement.nextSibling;
  retweetBox.setAttribute('id', temp);
  console.log(retweetBox.innerHTML);
  if(retweetBox.innerHTML==""){
    retweetBox.innerHTML = `
  <div id="${temp + 1}" class=" absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[184px] -ml-20 ">
  <ul class=" text-sm text-gray-700  aria-labelledby="dropdownDefaultButton">
      <li>
      <div id='directRetweet' class="z-30 bg-white cursor-pointer rounded-lg text-center flex  p-3 shadow-2xl" style="height:52px; width:110px;margin-left: -100px;
      margin-top: -10px;
  }" >
      <a class="my-auto" >
          <svg class="text-center h-7 w-6" fill="black" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" stroke="currentColor"
          viewBox="0 0 24 24">
              <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>   
      </a>
      <span class="px-2  py-auto">
          <p id="${temp+2}" class="font-bold text-black size-10">Repost</p>
      </span>
  </div>
      </li>
  </ul>
</div>
  `;
  }
  
  icon.setAttribute('data-modal-toggle', temp);
  icon.setAttribute('data-modal-target', temp);
  let directRetweet = document.getElementById('directRetweet');
  let removeRepostBox = document.getElementById('removeRepostBox');
  removeRepostBox.style.display = 'block';
  removeRepostBox.onclick = () => {
    console.log(retweetBox.childNodes[1]);
    retweetBox.childNodes[1].style.display = "none";
    removeRepostBox.style.display = "none";
  }
  let repostText = document.getElementById(temp+2);
  if (repostText.innerText == "Repost") {
    directRetweet.addEventListener('click', async () => {
    repostText.innerText="Undo Repost";
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
      }
      icon.style.color='blue';
    })
    }
    else if (repostText.innerText == "Undo Repost") {
      
    }
}
