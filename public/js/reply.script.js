function Reply(comment_id) {
    let tweetId = document.querySelector('#tweet_id').value;
    console.log(tweetId);
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
                tweetId: tweetId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                commentText.value = '';
                showReply(comment_id);
            })
            .catch(error => console.error('Error:', error));
    }
}
async function showReply(comment_id) {
    let replySection = document.querySelector(`.replies_${comment_id}`);
    let showReplyButton = document.querySelector(`.showreply_${comment_id}`);

    showReplyButton.style.display = 'flex';
    let data = await fetch('/get_reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_id: comment_id }),
    });
    data = await data.json();
    console.log(data.replies);
    let repliesHtml = '';
    data.replies.forEach(reply => {
        let reply_list = ` 
            <div class="">
                <div class="relative flex items-start my-1 hover:bg-gray-100 transition duration-350 ease-in-out">
                <div class="shrink-0">
                        <img class="inline-block h-8 w-8 rounded-full"
                        src="/uploads/${reply.profile_img_url}" alt="" />
                </div>
                <div class="ml-3" style="width:90%;">
                    <p class="font-bold text-lg text-wrap">
                        ${reply.name} <span class="font-medium text-sm text-gray-400">
                                ${reply.username} .
                            </span>
                            <span
                                class="mr-10 text-sm leading-5 font-medium text-gray-400 transition ease-in-out duration-150">
                                ${reply.time}
                            </span>
                            <span class="ml-10 absolute top-0 right-0" onclick="showButton('${reply.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </span>
                    </p>
                    <div>
                    <pre class="textarea_${reply.id} block mr-3 text-base width-auto font-normal text-balance overflow-hidden font-sans"
                    style="word-wrap: break-word; overflow-wrap: break-word;">${reply.content}</pre>
                    </div>
                </div>
                   
                    <div
                        class="show_${reply.id} bg-white shadow-xl rounded-xl cursor-pointer hidden absolute top-2 right-10">
                        <div onclick="deleteReply('${reply.id}','${reply.comment_id}')"
                            class="text-red-700 font-bold hover:bg-slate-100 py-2 px-4">Delete</div><hr class="border border-gray-100">
                    </div>
        
            </div>
`;
        repliesHtml += reply_list;
    });
    replySection.innerHTML = repliesHtml;
    replySection.style.display = 'flex';
}

function deleteReply(replyId, comment_id) {
    console.log(replyId);
    fetch('/delete_reply/:id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            replyId: replyId,
        }),
    })
        .then(response => response.json())
        .then(data => {
            showReply(comment_id);
        })
        .catch(error => console.error('Error:', error));
}


function editReply(replyId, comment_id) {
    let textarea = document.createElement('textarea');
    textarea.value = document.querySelector(`.textarea_${replyId}`).innerText;

    document.querySelector(`.textarea_${replyId}`).replaceWith(textarea);

    textarea.addEventListener('change', () => {
        let newContent = textarea.value;
        fetch('/edit_reply/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                replyId: replyId,
                newContent: newContent,
            }),
        })
            .then(response => response.json())
            .then(data => {
                showReply(comment_id);

            })
            .catch(error => console.error('Error:', error));
    });
}

function showButton(comment_id) {
    let showBtn = document.querySelector(`.show_${comment_id}`)
    if (showBtn.style.display == 'block') {
        showBtn.style.display = 'none'
    } else {
        showBtn.style.display = 'flex'
    }
}