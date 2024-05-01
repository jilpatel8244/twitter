let replies = document.getElementById("replies");
let posts = document.getElementById("posts");
let like = document.getElementById("like");
let profileMedia = document.getElementById("itsMedia");
let url = (window.location).toString();
let modifiedUrl;

if (url.match("http://localhost:3000/profile") == null) {
  modifiedUrl = url.slice(37);
} else {
  modifiedUrl = url.slice(29);
  console.log("Here is the modified Url", +modifiedUrl);
}


async function fetchPosts() {

  let data = await fetch('profile/post' + modifiedUrl, {
    method: "GET"
  });

  let response = await data.json();

  let allTweets = document.getElementById('allTweets');
  allTweets.innerHTML = "";

  if (response.message.length) {


    let tweet = getTweetComponent(response.message);

    allTweets.innerHTML = tweet;

  } else {
    allTweets.innerHTML = `<div class="w-3/5" style="margin: 50px auto;">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Save posts for later</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">You didn't Posted yet. Let's Get Started! </p>
                                        </div>
                                      </div>`;
  }
  posts.setAttribute("style", "border-bottom: 3px solid skyblue");
  replies.removeAttribute("style");
  like.removeAttribute("style");
  profileMedia.removeAttribute("style");
}

async function fetchReplies() {
  let data = await fetch('profile/reply' + modifiedUrl, {
    method: "GET"
  });

  let response = await data.json();

  let allTweets = document.getElementById('allTweets');
  allTweets.innerHTML = "";

  if (response.message.length) {


    let tweet = getTweetComponent(response.message);

    allTweets.innerHTML = tweet;

  } else {
    allTweets.innerHTML = `<div class="w-3/5" style="margin: 50px auto;">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">There is no Replies to show</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">There is no reply data to show.</p>
                                        </div>
                                      </div>`;
  }
  replies.setAttribute("style", "border-bottom: 3px solid skyblue");
  posts.removeAttribute("style");
  like.removeAttribute("style");
  profileMedia.removeAttribute("style");
}

async function fetchLikes() {
  let data = await fetch('profile/like' + modifiedUrl, {
    method: "GET"
  });

  let response = await data.json();

  let allTweets = document.getElementById('allTweets');
  allTweets.innerHTML = "";

  if (response.message.length) {


    let tweet = getTweetComponent(response.message);

    allTweets.innerHTML = tweet;

  } else {
    allTweets.innerHTML = `<div class="w-3/5" style="margin: 50px auto;">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">It seems that you didn't like any post</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">There is no Liked posts.</p>
                                        </div>
                                    </div>`;
  }
  like.setAttribute("style", "border-bottom: 3px solid skyblue");
  replies.removeAttribute("style");
  posts.removeAttribute("style");
  profileMedia.removeAttribute("style");
}

async function fetchMedia() {
  let data = await fetch('/profile/media' + modifiedUrl, { method: "GET" });
  let response = await data.json();


  let allTweets = document.getElementById("allTweets");
  allTweets.innerHTML = "";

  if (response.media.length) {
    allTweets.innerHTML = getTweetComponent(response.media);
  } else {
    allTweets.innerHTML = `<div class="w-3/5" style="margin: 50px auto;">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Posts Medias </h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">There is no Media to Show.</p>
                                        </div>
                                    </div>`;
  }
  like.removeAttribute("style");
  replies.removeAttribute("style");
  posts.removeAttribute("style");
  profileMedia.setAttribute("style", "border-bottom: 3px solid skyblue");
};


async function toggleFollow(id) {
  const body = {
    id: id
  }
  try {
    const response = await fetch('/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const responseData = await response.json();

    if (!responseData.statusdata) document.getElementById("followButton").innerHTML = "Following"
    if (responseData.statusdata) document.getElementById("followButton").innerHTML = "Follow"


  } catch (error) {
    console.error(error.message);
  }
}