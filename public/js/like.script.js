async function likeHandler(tweetId) {
    let url = window.location.origin + '/like';

    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'tweetId': tweetId }), // body data type must match "Content-Type" header
    });

    let response = await data.json();
    
    if (response.success == true) {
        let likeImg = document.querySelector(`.like_${tweetId}`);

        if (response.likeStatus) {
            likeImg.classList.add('fill-red-600', 'text-red-600');
        } else {
            likeImg.classList.remove('fill-red-600', 'text-red-600');
        }
        
    } else {
        console.log(response.message);
    }
}