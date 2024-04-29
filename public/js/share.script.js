async function shareLinkHandler(tweetId) {
    // create link
    let link = window.location.origin + '/get_comments/' + tweetId;

    // copy to keyboard
    try {
        await navigator.clipboard.writeText(link);
    } catch (error) {
        console.error(error.message);
    }

    // display toast
    

    // make display: none to shareToggle
    let shareOptionsDiv = document.getElementById(`shareOptions`+ tweetId);
    shareOptionsDiv.style.display = "none";
}