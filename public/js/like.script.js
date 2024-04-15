async function likeHandler(tweetId) {

    let data = await fetch('/like', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'tweetId': tweetId }), // body data type must match "Content-Type" header
        });
    console.log(data);
    let response = await data.json();

    if (response.success == true) {
        let likeImg = document.querySelector(`.like_${tweetId}`);

        if (response.likeStatus) {
            likeImg.classList.add('fill-red-600', 'text-red-600');
        } else {
            likeImg.classList.remove('fill-red-600', 'text-red-600');
        }

        console.log(response);
    }
}