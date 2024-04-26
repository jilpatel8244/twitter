
async function gettweets() {
    async function getdata() {
        let url = window.location.origin + "/admin/gettweet"
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
            content
            </th>
            <th scope="col" class="px-6 py-3">
            name   
            </th>
            <th scope="col" class="px-6 py-3">
            username
            </th>
            <th scope="col" class="px-6 py-3">
            Media
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
        ${element.content}
        </td>
        <td class="px-6 py-4">
        <div class="iconname">
        <img src="/assets/user-regular.svg" alt=""
        class="w-6 h-6 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500">
        ${element.name}
        </div>
        </td>
        <td class="px-6 py-4">
        ${element.username}
        </td>
        <td class="px-6 py-4">
        <img src="/uploads/${element.media_url}"  class="w-16 md:w-32 max-w-full max-h-full" alt="Media not Avi">
        </td>`

        if (element.is_ristricted == 0) {
            user += `<td class="px-6 py-4">
            <div>
                 <img src="/assets/green.png" onclick="tweetristric(${element.id},${element.is_ristricted})">
            </div>
        </td>
        
    </tr>`

        }
        else {
            user += `<td class="px-6 py-4">
            <div> <img src="/assets/red.png" onclick="tweetristric(${element.id},${element.is_ristricted})">
            </div>
        </td> </tr>`

        }
    });
    user += `
        </tbody></table></div>`

    return user;

}


async function ristric(tweetId, ristric) {
    let url = window.location.origin + '/admin/ristrictweet';
    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'tweetId': tweetId, 'ristric': ristric }),
    });
}