async function bookmarkHandler(tweetId) {
    let url = window.location.origin + '/bookmark';

    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'tweetId': tweetId }), // body data type must match "Content-Type" header
    });

    let response = await data.json();
    if (response.success == true) {
        let bookmarkImg = document.querySelector(`.bookmark_${tweetId}`);
        if (response.bookmarkStatus) {
            bookmarkImg.classList.add('fill-blue-300', 'text-blue-800');
        } else {
            bookmarkImg.classList.remove('fill-blue-300', 'text-blue-800');
        }

        // bookmark ma hase to entry ni display none jo bookmark remove kare to but in home page its not the case
        if ((window.location.href).includes('bookmark')) {
            // document.getElementById(tweetId).style.display = 'none';
            document.getElementById(tweetId).parentElement.parentElement.remove();

            if (!document.getElementById('allTweets').querySelector('ul').childElementCount) {
                let allTweets = document.getElementById('allTweets');
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `<div class="w-3/5 mx-auto my-8">
                <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Save posts for later</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">Bookmark posts to easily find them again in the future.</p>
                                        </div>
                                    </div>`;
                allTweets.appendChild(newDiv);
            }
        }
        // console.log(response);
    } else {
        console.log(response.message);
    }
}