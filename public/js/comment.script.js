function Comment(tweetId) {
    let commentText = document.querySelector('#comments');
    if (commentText.value !== '') {

        fetch('/post_comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tweetId: tweetId,
                comment: commentText.value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                commentText.value = '';
                location.reload();
            })
            .catch(error => console.error('Error:', error));
    }
    else {
        Swal.fire("Please add your comment!");
    }
}
function Reply(comment_id) {
    console.log("OK");
    let commentText = document.querySelector(`.reply_${comment_id}`);
    if (commentText.value !== '') {

        fetch('/post_reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: comment_id,
                content: commentText.value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                commentText.value = '';
                location.reload();
            })
            .catch(error => console.error('Error:', error));
    }
}
async function showReply(comment_id) {
    document.querySelector(`.showreply_${comment_id}`).style.display = 'flex';

    let data = await fetch('/get_reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment_id: comment_id,
        }),
    });

    data = await data.json();
    console.log(data.replies);

    let repliess = document.querySelector(`.replies_${comment_id}`);
    data.replies.forEach(reply => {
        let reply_list = `<ul><li class="border border-gray-50 bg-sky-200">${reply.content}</li></ul>`;
        repliess.innerHTML += reply_list;
    });
}
function show(tweetId) {
    document.querySelector(`.comments_${tweetId}`).style.display = 'block';
    document.querySelector(`.comments_${tweetId}`).style.opacity = '1';
}
function hide(tweetId) {
    document.querySelector(`.comments_${tweetId}`).style.display = 'none';
}
