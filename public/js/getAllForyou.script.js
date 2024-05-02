async function getHomeForyouHandler() {
  let element = document.querySelector("#foryou_btn");
  element.style.borderBottom = "10px solid rgba(59, 130, 246, 0.5)";
  element.style.borderBottomWidth = "4px";
  document.querySelector("#following_btn").style.borderBottom = "none";

  let url = window.location.origin + "/getHomeForyou";

  let data = await fetch(url, {
    method: "GET",
  });

  let response = await data.json();
  let allTweets = document.getElementById("allTweets");

  if (response.success == true) {
    if (response.message.length) {
      let tweet = getRetweetComponent(response.message);

      allTweets.innerHTML = tweet;
    } else {
      allTweets.innerHTML = ``;
    }
  }
}
