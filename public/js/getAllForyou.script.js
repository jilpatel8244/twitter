async function getHomeForyouHandler() {
  let url = window.location.origin + "/getHomeForyou";

  let data = await fetch(url, {
    method: "GET",
  });

  let response = await data.json();
  let allTweets = document.getElementById("allTweets");
let arr = [...response.message.rows, ...response.message.retweetData];
console.log(arr);
 
  if (response.success == true) {
    if (response.message) {
      if (response.message.rows.length) {
        let tweet = getRetweetComponent(response.message.rows);
        allTweets.innerHTML += tweet;
      }
      if (response.message.retweetData.length) {
        let tweet = getRetweetComponent(response.message.retweetData);
        allTweets.innerHTML += tweet;
      } else {
        allTweets.innerHTML = `<div class="w-3/5 mx-auto my-8">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Save posts for later</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">Bookmark posts to easily find them again in the future.</p>
                                        </div>
                                    </div>`;
      }
    }
  } else {
    console.log(response.message);
    console.log(response.retweetData);
  }
}