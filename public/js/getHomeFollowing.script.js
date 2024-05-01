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

            let tweet = getTweetComponent(response.message);

            allTweets.innerHTML = tweet;

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
    } else {
        console.log(response.message);
    }
}