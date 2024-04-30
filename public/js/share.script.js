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
    let timerInterval;
    Swal.fire({
        title: "Copy to clipboard",
        timer: 1000,
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });

    // make display: none to shareToggle
    let shareOptionsDiv = document.getElementById(`shareOptions`+ tweetId);
    shareOptionsDiv.style.display = "none";
}