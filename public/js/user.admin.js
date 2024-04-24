
async function getuserpage() {
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
        <div>

            
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div
                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input type="text" id="table-search-users"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users">
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Username
                </th>
                <th scope="col" class="px-6 py-3">
                Email
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
            <div onclick="userhandel(${element.id})" id="green">
            <img src="/assets/green.png" >
       </div>
        </td>
      
    </tr>`

        }
        else {
            user += `<td class="px-6 py-4">
            <div  id="red">
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

