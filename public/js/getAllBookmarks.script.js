async function getAllBookamrkHandler() {
    let url = window.location.origin + '/getAllBookmarks';

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
            allTweets.innerHTML = `<div class="w-3/5" style="margin: 50px auto;">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Save posts for later</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">Bookmark posts to easily find them again in the future.</p>
                                        </div>
                                    </div>`;
        }
    } else {

    }
}