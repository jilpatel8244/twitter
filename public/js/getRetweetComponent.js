function getRetweetComponent(data) {
  let tweet = `<ul class="list-none">`;

  data.forEach((tweets) => {
    if (tweets.retweetId) {
      tweet += `<li>
                      <article class="hover:bg-gray-100 transition duration-350 ease-in-out">
                          <div id="${tweets.tweet_id}">
                              <div class="flex flex-shrink-0 p-4 pb-0 flex-col">
                                  <a href="/get_comments/${tweets.tweet_id}" class="flex-shrink-0 group block">
                                      <div class="flex items-center">
                                          <div>`;

      if (tweets.profile_img_url) {
        tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/uploads/${tweets.profile_img_url}" alt="" />`;
      } else {
        tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/assets/profile.png" alt="" />`;
      }
      tweet += `</div>
              <div class="ml-3">
                     <p class="text-base leading-6 font-medium text-black">
                       ${tweets.name}
                           <span
                             class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                             @ ${tweets.username} . ${tweets.time}
                           </span>
                    </p>
                </div>
                </div>
                <div class="ml-4 mb-2"> `;
      if (tweets.tweetContnet) {
        tweet += `  <pre class="mr-3 ml-3 text-base width-auto font-normal text-balance overflow-hidden" style="word-wrap: break-word; overflow-wrap: break-word; font-family: sans-serif;">${tweets.tweetContnet}</pre> `;
      }
      if (tweets.media_url) {
        tweet += `<div class="md:flex-shrink pr-6 pt-3">
                                                      <div class="bg-cover bg-no-repeat bg-center rounded-lg size-fit">
                                                          <img class="" src="/uploads/${tweets.media_url}" alt="missing">
                                                      </div>
                                                      </a>
                                                  </div>`;
      }
      tweet += `
              </div>
             </a>
        </div>
    <div class="pl-16 border border-gray-500 rounded-lg p-4" style = 'margin: 22px'>
        <a href="">
        <div class="ml-3 flex">
        <p class="text-base leading-6 font-medium text-black">`;
    if (tweets.original_poster_profile_img_url) {
      tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/uploads/${tweets.original_poster_profile_img_url}" alt="" />`;
    } else {
      tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/assets/profile.png" alt="" />`;
    }

    tweet += `                              <div class="ml-3 mt-2">
                                                <p class="text-base leading-6 font-medium text-black">
                                                    ${tweets.original_poster_name}
                                                        <span
                                                            class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @ ${tweets.original_poster_username} . ${tweets.tweetTime}
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                

                                <div class="pl-16 mt-4">
                                    <a href="/get_comments/${tweets.tweet_id}">
                                    <pre class="mr-3 text-base width-auto font-normal text-balance overflow-hidden" style="word-wrap: break-word; overflow-wrap: break-word; font-family: sans-serif;">${tweets.original_tweet_content}</pre>
                                    </div>
                                    `;

    if (tweets.original_media_url) {
      tweet += `<div class="md:flex-shrink pr-6 pt-3">
                                                    <div class="bg-cover bg-no-repeat bg-center rounded-lg size-fit">
                                                        <img class="" src="/uploads/${tweets.original_media_url}" alt="missing">
                                                    </div>
                                                    </a>
                                                </div>`;
    }
}else{    
    tweet += `
    <li>
        <article class="hover:bg-gray-100 transition duration-350 ease-in-out">
            <div id="${tweets.tweet_id}">
                <div class="flex flex-shrink-0 p-4 pb-0">
                    <a href="/explore/profile?id=${tweets.user_id}" class="flex-shrink-0 group block">
                        <div class="flex items-center">
                            <div>`

if (tweets.profile_img_url) {
tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/uploads/${tweets.profile_img_url}" alt="" />`
} else {
tweet += `<img class="inline-block h-10 w-10 rounded-full" src="/assets/profile.png" alt="" />`
}

tweet += `</div>
                            <div class="ml-3">
                                <p class="text-base leading-6 font-medium text-black">
                                    ${tweets.name}
                                        <span
                                            class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                            @ ${tweets.username} . ${tweets.time}
                                        </span>
                                </p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="pl-16">
                    <a href="/get_comments/${tweets.tweet_id}">
                    <pre class="mr-3 text-base width-auto font-normal text-balance overflow-hidden" style="white-space: no-wrap;  text-overflow: ellipsis; word-wrap: break-word; overflow-wrap: break-word; font-family: sans-serif;">${tweets.tweetContnet}</pre>
                    `
if (tweets.media_url) {
tweet += `<div class="md:flex-shrink pr-6 pt-3">
                                    <div class="bg-cover bg-no-repeat bg-center rounded-lg size-fit">
                                        <img class="" src="/uploads/${tweets.media_url}" alt="missing">
                                    </div>
                                    </a>
                                </div>`
}

}
    tweet += `
    </div>
                <div class="flex">
                                  <div class="w-full">
                                      <div class="flex items-center justify-around pr-6">

                                          <!-- comment span tag -->

                                          <input type="hidden" name="tweet_id" value="${tweets.tweet_id}">
                                          <a href="/get_comments/${tweets.tweet_id}" class="flex text-center py-2 m-2">

                                              <div class="flex-1 text-center" data-modal-target="crud-modal"
                                                  data-modal-toggle="crud-modal">
                                                  <span
                                                      class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-400">
                                                      <svg class="text-center h-6 w-6" fill="none" stroke-linecap="round"
                                                          stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                                          viewBox="0 0 24 24">
                                                          <path
                                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                                          </path>
                                                      </svg>
                                                  </span>
                    </div>
                </a>
                <!-- retweet span tag -->
                <div  class="flex text-center py-2 m-2 cursor-pointer">`;
    if (tweets.notRetweeted == null && tweets.createdAt != null) {
      tweet += ` <span
                                              
                                              onclick=retweet(${
                                                tweets.tweet_id
                                              },this,'undo');
                                              class="group flex items-center text-blue-600 px-3 py-2 text-base leading-6 font-medium rounded-full">
                                              <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                                  viewBox="0 0 24 24">
                                                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                              </svg>
                                              <span id="${
                                                tweets.tweet_id
                                              }tweet" class="group flex items-center text-blue-600 px-3 py-2 text-base leading-6 font-medium rounded-full">
                                              ${
                                                tweets.repostCount
                                                  ? tweets.repostCount
                                                  : ""
                                              }
                                          </span>
                                          </span>
                                          
                                              </div><div id="retweetBox" class="overflow-y-auto overflow-x-hidden  z-30  md:inset-0  h-full  max-h-full" style="z-index: 25;"></div>`;
    } else {
      tweet += `<span
                                                  
                                                  onclick=retweet(${
                                                    tweets.tweet_id
                                                  },this,'retweet');
                                                  class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-600">
                                                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                                      viewBox="0 0 24 24">
                                                      <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                                  </svg>
                                                  <span id="${
                                                    tweets.tweet_id
                                                  }tweet" class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full">
                                                  ${
                                                    tweets.repostCount
                                                      ? tweets.repostCount
                                                      : ""
                                                  }
                                              </span>
                                              </span>
                                          

                                          </div><div id="retweetBox" class="overflow-y-auto overflow-x-hidden  z-30  md:inset-0  h-full  max-h-full" style="z-index: 25;"></div>`;
    }

    tweet += `<div id="removeRepostBox"  style="display: none;z-index: 15; position: absolute; top:0;left:0;width:99vw; height:300vh">

                                          </div>


                                          <!-- like span tag -->
                                          <div class="flex items-center text-center py-2 m-2">
                                              <span
                                                  class="group flex items-center px-1 py-2 text-base leading-6 font-medium rounded-full  hover:text-red-300">`;
    if (tweets.isLiked) {
      tweet += `<svg class="text-center h-7 w-6 fill-red-600 text-red-600 like_${tweets.tweet_id}"
                                                              fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                              onclick="likeHandler('${tweets.tweet_id}')">
                                                                  <path
                                                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                                                  </path>
                                                          </svg>`;
    } else {
      tweet += `<svg class="text-center h-7 w-6 text-gray-500 like_${tweets.tweet_id}"
                                                              fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                              onclick="likeHandler('${tweets.tweet_id}')">
                                                                  <path
                                                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                                                  </path>
                                                          </svg>`;
    }
    tweet += `</span>
                                              <span class="px-1 py-2" id="likeCount${tweets.tweet_id}">
                                                  ${tweets.likeCount}
                                              </span>
                                              <script>
                                                  if (parseInt(document.getElementById('likeCount'+'${tweets.tweet_id}').innerHTML)) {
                                                      document.getElementById('likeCount'+'${tweets.tweet_id}').style.display = "block";
                                                  } else {
                                                      document.getElementById('likeCount'+'${tweets.tweet_id}').style.display = "none";
                                                  }
                                              </script>
                                          </div>


                                          <!-- share span tag -->
                                          <div class="flex py-2 m-2 relative">
                                              <span
                                                  class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-300"
                                                  onclick="shareToggle(${tweets.tweet_id})"
                                                  >
                                                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                                      viewBox="0 0 24 24">
                                                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12">
                                                      </path>
                                                  </svg>
                                              </span>

                                              <div id="shareOptions${tweets.tweet_id}" style="width: 220px; display: none; top: 45px; left: -100px;" class="absolute p-4 border shadow-lg rounded-xl cursor-pointer bg-white">
                                                  <div onclick="shareLinkHandler(${tweets.tweet_id})">
                                                      <p class="text-left">Copy link</p>
                                                  </div>
                                                  <div onclick="openModal('modelConfirm', '${tweets.tweet_id}')">
                                                      <p class="text-left">Send via Direct Message</p>
                                                  </div>
                                              </div>
                                          </div>


                                          <!-- bookmark span tag -->
                                          <div class="flex text-center py-2 m-2 ">
                                              <span
                                                  class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-300">`;
    if (tweets.isBookmarked) {
      tweet += `<svg class="text-center h-7 w-6 fill-blue-300 text-blue-800 bookmark_${tweets.tweet_id}"
                                                                  fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                                  onclick="bookmarkHandler('${tweets.tweet_id}')">
                                                                      <path
                                                                          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                                                                      </path>
                                                              </svg>`;
    } else {
      tweet += `<svg class="text-center h-7 w-6 bookmark_${tweets.tweet_id}"
                                                                  fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                                  onclick="bookmarkHandler('${tweets.tweet_id}')">
                                                                      <path
                                                                          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                                                                      </path>
                                                              </svg>`;
    }
    tweet += `</span>
                                          </div>


                                          <!-- views span tag -->
                                          <div class="flex text-center py-2 m-2">
                                              <span href="#"
                                                  class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-300">
                                                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                                      viewBox="0 0 24 24">
                                                      <path
                                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                                      </path>
                                                  </svg>
                                              </span>
                                          </div>


                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr class="border-gray-200">
                      </article>
                  </li > `;
  });

  tweet += `</ul>`;

  return tweet;
}

function shareToggle(tweet_id) {
  let shareOptionsDiv = document.getElementById(`shareOptions` + tweet_id);
  if (shareOptionsDiv.style.display == "none") {
    shareOptionsDiv.style.display = "block";
  } else {
    shareOptionsDiv.style.display = "none";
  }
}
