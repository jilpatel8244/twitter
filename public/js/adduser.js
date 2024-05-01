async function addusercontroler() {

    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    adduser.classList.add("active");
    let content = document.getElementById("content");
    let content1 = document.getElementById("content1");
    content1.style.display = "none"
    content.style.display = "block"
    let contentadd = `
    
    <div class="option">

<div class="heading">
<p id="pagenumber">Add users</p>
<hr>
</div>
<div class="fileimg" >
<img src="/assets/file.png" alt="" class="imgfile" id="fileimg">
<p>Add users using csv</p>

</div>
<div class="fileupload" id="fileupload">

<input type="file" id="filecsv" name="filecsv">

<p id="brt"
    class="px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 btnsub transform bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
    value="submit">
    submit
</p>
</div>
<div class="fileimg" >
<img src="/assets/form.png" alt="" class="imgfile" id="formimg1">
<p>Add user using form</p>
</div>
<div id="formuser">
<input
    class="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
    type="text" placeholder="Name" id="name" aria-label="Name" name="name" />

<input
    class="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
    type="text" placeholder="Username" id="username" aria-addlabel="Username" name="username" />
<input
    class="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
    type="text" placeholder="Email Address" id="email" aria-label="Email Address" name="email" />
<input
    class="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-500 bg-white border rounded-lg focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-white"
    placeholder="Date Of Birth" class="textbox-n" type="text" onfocus="(this.type='date')"
    onblur="(this.type='text')" id="dob" aria-label="date" name="dob" /> 
<input
    class="block w-full px-4 py-2 mt-2 text-gray-800 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-300"
    type="password" id="password" name="password" placeholder="Password" aria-label="password" required />
<p id="confirm"
    class="px-6 py-2 text-sm mt-4 btnsub font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
    value="create">
    create
</p>


</div>

</div>`

    content.innerHTML = contentadd;


    let confirm = document.getElementById("confirm")
    confirm.addEventListener("click", formdatahandel)

    async function formdatahandel() {
        let name = document.getElementById("name");
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let dob = document.getElementById("dob");
        let password = document.getElementById("password");
        let formdata = new FormData();
        formdata.append("name", name.value)
        formdata.append("username", username.value)
        formdata.append("email", email.value)
        formdata.append("date_of_birth", dob.value)
        formdata.append("password", password.value)
        console.log(formdata);

        let data = await fetch("/admin/adduser", {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formdata)
        })
    }

    let brt = document.getElementById("brt")
    brt.addEventListener("click", filehandel)
    async function filehandel() {
        let name = document.getElementById("name");
        let filecsv = document.getElementById("filecsv");

        alert("hello ")
        let formdata = new FormData();
        formdata.append("name", name.value)
        formdata.append("file", filecsv.files[0])

        let data = await fetch("/admin/uploadcsv", {
            method: "POST",
            body: formdata
        })
    }

}
