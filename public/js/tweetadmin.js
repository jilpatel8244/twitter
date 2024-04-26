
async function gettweets(search1) {
    async function getdata() {
        let url = window.location.origin + "/admin/gettweet"
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'search': search1, 'page': search1 }),
        });
        data = await data.json()
        return data.data;
    }

    let data = await getdata();
    let user = `
    <div class="flex gap-8" >
            <div class="pagination">
            <p class="pagebtn">
            < </p>  
            <div class="flex">
            <p>page &nbsp</p>
            <p> 1</p>
            </div>
            <p class="pagebtn">></p>
            </div>

            <div class="ml-20">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            </div>`
    if (typeof search1 == "string") {
        user += `<input type="text" id="table-search-users"
                class="tweet block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users" value="${search1}">`
    }
    else {
        user += `<input type="text" id="table-search-users"
                class="tweet block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users" >`
    }

    user += `</div >
            </div >
            </div >
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