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
                showReply(comment_id);
            })
            .catch(error => console.error('Error:', error));
    }
}
async function showReply(comment_id) {
    let replySection = document.querySelector(`.replies_${comment_id}`);
    let showReplyButton = document.querySelector(`.showreply_${comment_id}`);

    // if (replySection.style.display === 'none' || replySection.style.display === '') {
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
            <div class="" style="width:95%;">
                <div class=" flex items-start relative my-1">
                <div class="shrink-0">
                        <img class="inline-block h-8 w-8 rounded-full"
                        src="/uploads/${ reply.profile_img_url }" alt="" />
                </div>
                <div class="ml-3" style="width:90%;" >
                    <p class="font-bold text-lg text-wrap">
                        ${ reply.name } <span class="font-medium text-sm text-gray-400">
                                ${ reply.username } .
                            </span>
                            <span
                                class="text-sm leading-5 font-medium text-gray-400 transition ease-in-out duration-150">
                                ${ reply.time }
                            </span>
                    </p>
                    <div>
                    <pre class="block mr-3 text-base width-auto font-normal text-balance overflow-hidden font-sans"
                    style="word-wrap: break-word; overflow-wrap: break-word;">${ reply.content }</pre>
                    </div>
                </div>
                    <div class="absolute top-0 right-5" onclick="showButtons('${ reply.id }')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </div>
                    <div
                        class="show_${ reply.id } bg-white shadow-xl rounded-xl cursor-pointer hidden absolute top-2 right-10">

                        <div onclick="deleteComment('${ reply.id }')"
                            class="text-red-700 font-bold hover:bg-slate-100 py-2 px-4">Delete</div><hr class="border border-gray-100">
                        <div onclick="editComment('${ reply.id }')" class="text-blue-700 font-bold hover:bg-slate-100 py-2 px-4">
                            Edit</div>
                    </div>
        
            </div>
`;
            repliesHtml += reply_list;
        });
        replySection.innerHTML = repliesHtml;
        replySection.style.display = 'flex';
    // } else {
    //     replySection.style.display = 'none';
    // }
}
