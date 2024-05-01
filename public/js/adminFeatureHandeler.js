
async function usershandeler(search = "", curpage = 1) {

    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    users.classList.add("active");
    let content = document.getElementById("content");
    let content1 = document.getElementById("content1");
    content1.style.display = "none"
    content.style.display = "block"
    let userscontent = await getuserpage(search, curpage);
    content.innerHTML = userscontent;
    await filldata()
}

async function tweetshandeler(search = "", curpage = 1) {
    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    tweets.classList.add("active");
    let content1 = document.getElementById("content1");
    content1.style.display = "none"
    content.style.display = "block"

    let tweetcontent = await gettweets(search, curpage);
    content.innerHTML = tweetcontent;
}

async function hastagshandeler(search = "") {
    alert("hello")
}

async function verifyhandeler(search = "", curpage = 1) {
    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    verification.classList.add("active");
    let content1 = document.getElementById("content1");
    content1.style.display = "none"
    content.style.display = "block"

    let verification1 = await verify_request(search, curpage);
    content.innerHTML = verification1

}

async function supporthandeler() {
    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    support.classList.add("active");
    let content = document.getElementById("content");
    content.style.display = "none"
    let content1 = document.getElementById("content1");
    content1.style.display = "block"
    await filldata()

}
