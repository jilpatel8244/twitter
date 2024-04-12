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
        let bookmarkImg = document.querySelector(`.bookmark_${tweetId} svg`);
        if (response.bookmarkStatus) {
            bookmarkImg.classList.add('fill-blue-300', 'text-blue-800');
        } else {
            bookmarkImg.classList.remove('fill-blue-300', 'text-blue-800');
        }

        // bookmark ma hase to entry ni display none jo bookmark remove kare to but in home page its not the case
        if (url.includes('bookmark')) {
            // document.getElementById(tweetId).style.display = 'none';
            document.getElementById(tweetId).remove();

            if (!document.getElementById('allTweets').childElementCount) {
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `<div>No saved post</div>`;
                document.getElementById('allTweets').appendChild(newDiv);
            }

        }
        // console.log(response);
    } else {
        console.log(response.message);
    }
}