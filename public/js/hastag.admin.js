

async function gethastag() {
    async function getdata() {
        let url = window.location.origin + "/admin/getusers"
        let data = await fetch(url)
        data = await data.json()
        return data.data;
    }


    let data = await getdata();
    console.log(data);

    let user = `
    <div class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg tabal">
    <div
        class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    Hastag
                </th>
                <th scope="col" class="px-6 py-3">
                    total Tweets
                </th>
                <th scope="col" class="px-6 py-3">
                    total users
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
            <img src="/assets/user-regular.svg" alt=""
            class="w-6 h-6 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500">
            <div class="ps-3">

                <div class="font-normal text-gray-500">${element.name}</div>
            </div>
        </th>
        <td class="px-6 py-4">
        ${element.username}
        </td>
        <td class="px-6 py-4">
        ${element.email}
        </td>`

        if (element.is_active == 1) {
            user += `<td class="px-6 py-4">
            <div onclick="hastagverification()">
            <img src="/assets/green.png" >
       </div>
        </td>
      
    </tr>`

        }
        else {
            user += `<td class="px-6 py-4">
            <div>
            <img src="/assets/red.png" >
       </div>
        </td>
       
    </tr>`

        }




    });


    user += `
        </tbody>
    </table>
</div>
`

    return user;

}

