async function mainhandel(e) {

    console.log(e.target);
    let tableSearchUsers = document.getElementById("table-search-users");
    if (e.target.src == window.location.origin + "/assets/red.png") {
        e.target.src = "/assets/green.png"
    }
    else if (e.target.src == window.location.origin + "/assets/green.png") {
        e.target.src = "/assets/red.png"

    }
    let pagenumber = document.getElementById("pagenumber").innerText
    if (e.target.classList[0] == "gtuser") {

        await usershandeler(tableSearchUsers.value, Number(pagenumber) + 1)

    }
    else if (e.target.classList[0] == "ltuser") {
        await usershandeler(tableSearchUsers.value, Number(pagenumber) - 1)
    }


    if (e.target.classList[0] == "gttweet") {

        await tweetshandeler(tableSearchUsers.value, Number(pagenumber) + 1)

    }
    else if (e.target.classList[0] == "lttweet") {
        await tweetshandeler(tableSearchUsers.value, Number(pagenumber) - 1)
    }


    if (e.target.classList[0] == "gtverify") {

        await verifyhandeler(tableSearchUsers.value, Number(pagenumber) + 1)

    }
    else if (e.target.classList[0] == "ltverify") {
        await verifyhandeler(tableSearchUsers.value, Number(pagenumber) - 1)
    }

    if (e.target.id == "fileimg") {
        let formuser = document.getElementById("formuser")
        let fileupload = document.getElementById("fileupload")
        fileupload.style.display = "block"
        formuser.style.display = "none"

    } else if (e.target.id == "formimg1") {

        let formuser = document.getElementById("formuser")
        let fileupload = document.getElementById("fileupload")
        fileupload.style.display = "none"
        formuser.style.display = "block"
    }



    if (e.target.id == "chatbtntab") {

        tickitid = e.target.classList[0];
        let help = document.getElementById("help");
        tickitid = e.target.classList[0];
        help.innerText = tickitid;
        roomid = tickitid;


        console.log(roomid);



        chatload()
        async function chatload() {



            let data = await fetch("/admin/oldchats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 'tickitid': tickitid }),
            });





            data = await data.json();
            data = data.data;
            let chatbox = document.getElementById("chatbox");

            chatbox.innerHTML = ``

            data.forEach(element => {
                if (element.sender_id == 17) {
                    chatbox.innerHTML
                        +=
                        `
            <div class="mb-2 text-right">
            <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                ${element.content}</p>
                </div>
                    `
                }
                else {
                    chatbox.innerHTML += `   <div class="mb-2">
                        <p id="pagenumber"
                            class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        
                        ${element.content}</p>
                    </div>
            `
                }
            });


        }



    }

    if (e.target.id == "table-search-users") {
        let tableSearchUsers = document.getElementById("table-search-users");

        tableSearchUsers.addEventListener("keydown", searchhandel)
        let debouncing;

        function searchhandel(e) {

            clearTimeout(debouncing)
            debouncing = setTimeout(async () => {
                let search1 = tableSearchUsers.value;

                console.log(e.target.classList[0]);

                if (e.target.classList[0] == "user") {

                    let pagenumber = document.getElementById("pagenumber").innerText;
                    console.log("page number is ", pagenumber);
                    console.log(e.target.classList[0]);
                    alert("users")
                    await usershandeler(search1, pagenumber)
                }
                else if (e.target.classList[0] == "hashtag") {
                    await hastagshandeler(search1)
                }
                else if (e.target.classList[0] == "tweet") {
                    tableSearchUsers.focus()
                    await tweetshandeler(search1)
                }
                else if (e.target.classList[0] == "verify") {
                    let pagenumber = document.getElementById("pagenumber").innerText;
                    console.log("page number is ", pagenumber);
                    await verifyhandeler(search1, pagenumber)
                }




            }, 800)

        }
    }

}
