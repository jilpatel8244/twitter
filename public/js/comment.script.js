// function submitComment(tweetId) {
//     console.log("bls");
//     let commentInput = document.querySelector(`.comments_${tweetId} textarea[name="comment"]`);
//     let commentText = commentInput.value;
//     commentInput.value = '';

//     if (!commentText == '') {
//         console.log("ok");
//         fetch('/post_comments', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 tweetId: tweetId,
//                 comment: commentText,
//             }),
//         })
//             .then(response => response.json());
//         document.querySelector(`.comments_${tweetId}`).style.display = 'none';
//     }
//     else {
//         Swal.fire("Please write your Comment!");
//     }
// }

function Comment(tweetId) {
    console.log("bls");
    let commentText = document.querySelector('#comments');
    if (commentText.value !== '') {
        console.log("ok");
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
            // location.reload();
        })
        .catch(error => console.error('Error:', error));
       
    }
    else {
        Swal.fire("Please add your comment!");
    }
}

function Reply(comment_id) {
    console.log("OK");
    let commentText = document.querySelector('#reply');
    if (commentText.value !== '') {
        console.log("ok");
        fetch('/post_reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: comment_id,
                comment: commentText.value,
            }),
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => console.error('Error:', error));
       
    }
    
}


function show(tweetId) {
    document.querySelector(`.comments_${tweetId}`).style.display = 'block';
    document.querySelector(`.comments_${tweetId}`).style.opacity = '1';
}
function hide(tweetId) {
    document.querySelector(`.comments_${tweetId}`).style.display = 'none';
}
