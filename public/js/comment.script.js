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
function deleteComment(commentId) {
    fetch('/delete_comment/:id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentId: commentId,
        }),
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => console.error('Error:', error));
}
function editComment(commentId) {
    let textarea = document.createElement('textarea');
    textarea.value = document.querySelector(`.textarea_${ commentId }`).innerText;

    document.querySelector(`.textarea_${ commentId }`).replaceWith(textarea);

    textarea.addEventListener('change', () => {
        let newContent = textarea.value;
        fetch('/edit_comment/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentId: commentId,
                newContent: newContent,
            }),
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });
}
  function showButtons(comment_id){
    let showBtn = document.querySelector(`.show_${ comment_id }`)
    if (showBtn.style.display == 'block'){
     showBtn.style.display = 'none'
    }else{
     showBtn.style.display = 'block'
    }
 }
 
