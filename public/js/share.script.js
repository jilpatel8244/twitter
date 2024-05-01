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
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Copied to clipboard',
        background: 'rgb(14 165 233)',
        animation: false,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    // make display: none to shareToggle
    let shareOptionsDiv = document.getElementById(`shareOptions`+ tweetId);
    shareOptionsDiv.style.display = "none";
}