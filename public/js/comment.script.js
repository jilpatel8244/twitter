function submitComment(tweetId) {
    console.log("blaa");
    let commentInput = document.querySelector(`.comments_${tweetId} textarea[name="comment"]`);
    let commentText = commentInput.value;
    commentInput.value = '';

    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tweetId: tweetId,
            comment: commentText,
        }),
    })
    .then(response => response.json())
    document.querySelector(`.comments_${tweetId}`).style.display = 'none' ;
}

function show(tweetId){
    document.querySelector(`.comments_${tweetId}`).style.display = 'block' ;
    document.querySelector(`.comments_${tweetId}`).style.opacity = '1' ;
}
function hide(tweetId){
    document.querySelector(`.comments_${tweetId}`).style.display = 'none';
}