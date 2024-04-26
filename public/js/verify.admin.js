
async function verify_request() {
    async function getdata() {
        let url = window.location.origin + "/admin/getVerifyRequest"
        let data = await fetch(url)
        data = await data.json()
        return data.data;
    }

    let data = await getdata();
    let user = `
    <div class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg tabal">
    <div
        class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">
            tweet id
            </th>
           
            <th scope="col" class="px-6 py-3">
            name   
            </th>
            <th scope="col" class="px-6 py-3">
            username
            </th>
            <th scope="col" class="px-6 py-3">
            profile photo
            </th>
            <th scope="col" class="px-6 py-3">
            Profession
            </th>
            <th scope="col" class="px-6 py-3">
            Action 
            </th>
            </tr>
        </thead>
    <tbody>`
    data.forEach(element => {
        user += `
        <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row"
        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <div class="ps-3">
        <div class="font-normal text-gray-500">${element.id}</div>
        </div>
        </th>
     
        <td class="px-6 py-4">
        <div class="iconname">
        
        ${element.name}
        </div>
        </td>
        <td class="px-6 py-4">
        @${element.username}
        </td>
        <td class="px-6 py-4">
        <img src="/uploads/${element.profile_img_url}"  class="w-16 md:w-32 max-w-full max-h-full" alt="profile photo not availlable">
        </td>
        <td class="px-6 py-4">
        Cricketer
        </td>`

        if (element.request == 1) {
            user += `<td class="px-6 py-4">
            <div>
            <img src="/assets/green.png" onclick="verifyhandel(${element.id},${element.request},${element.reqid})">
            </div>
        </td>
        
    </tr>`

        }
        else {
            user += `<td class="px-6 py-4">
            <div>   
            <img src="/assets/red.png" onclick="verifyhandel(${element.id},${element.request},${element.reqid})">
            </div>
        </td> </tr>`

        }
    });
    user += `
        </tbody></table></div>`

    return user;

}

async function vrified(userId, request, reqid) {
    let url = window.location.origin + '/admin/updateverify';
    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'userId': userId, 'request': request, 'requestid': reqid }),
    });
}