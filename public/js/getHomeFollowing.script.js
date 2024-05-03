async function getHomeFollowingHandler() {
  let element = document.querySelector('#following_btn');
  element.style.borderBottom = '10px solid rgba(59, 130, 246, 0.5)'
  element.style.borderBottomWidth = '4px';
  document.querySelector('#foryou_btn').style.borderBottom = "none"

  let url = window.location.origin + '/getHomeFollowing';

  let data = await fetch(url, {
      method: "GET"
  });

  let response = await data.json();

  let allTweets = document.getElementById('allTweets');
  
  if (response.success == true) {
      if(response.message.length){

          let tweet = getRetweetComponent(response.message);

          allTweets.innerHTML = tweet;

      } else {
          allTweets.innerHTML = `<div class="w-3/5" style="margin: 70px auto 30px auto;">
                                      <div class="mb-3">
                                          <h2 class="font-bold text-3xl">Welcome to X!</h2>
                                      </div>
                                      <div class="mb-3">
                                          <p style="color: rgb(83, 100, 113);">This is the best place to see what’s happening in your world. Find some people and topics to follow now.</p>
                                      </div>
                                      <a href="/explore">
                                      <div
                                      class="bg-sky-500 hover:bg-sky-600 mt-5 text-white font-bold py-3 px-3 rounded-full flex justify-center select-none cursor-pointer" style="width:30%;">
                                      <span>
                                          Let's go!
                                      </span>
                                  </div>
                                  </a>
                                  </div>`;
      }
  } else {
      console.log(response.message);
  }
}
