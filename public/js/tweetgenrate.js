
async function gettweet(route, bodyargs = {}) {



    async function getdata(route, bodyargs) {
        let url = window.location.origin + route
        let data = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyargs)
        })

        data = await data.json()
        return data.resultTweet;

    }



    let data = await getdata(route, bodyargs);







    let tweet = ""
    data.forEach(tweets => {

        let time = "hello";

        let date1 = new Date(tweets.time);
        var currentdate = new Date();

        date1 = currentdate - date1;
        console.log(date1 / 1000 / 60 / 60);

        if ((date1 / 1000 / 60 / 60 / 24) >= 1) {
            time = ``;
            time += `${Math.floor(date1 / 1000 / 60 / 60 / 24)}`
            time += 'Days ago'
        }
        else if ((date1 / 1000 / 60 / 60) >= 1) {
            time = ``;
            time += `${Math.floor(date1 / 1000 / 60 / 60)}`
            time += ' Hours ago'
        }
        else if ((date1 / 1000 / 60) <= 60) {
            time = ``;
            time += `${Math.floor(date1 / 1000 / 60)}`
            time += ' Minutes ago'
        }
        else if ((date1 / 1000) <= 60) {
            time = '';
            time += `${Math.floor(date1 / 1000)}`
            time += ' Seconds ago'
        }


        // if (date1.get()) {
        //     time = ``;
        //     time += `${date1.getDay()}`;
        //     time += ` Days`;

        // }
        // else if (date1.getHours()) {
        //     time = ``;
        //     time += `${date1.getHours()}`;
        //     time += `Hours`;

        // }
        // else {
        //     time = ``;
        //     time += `${date1.getMinutes()}`;
        //     time += `minit`;
        // }


        tweet += `<li>
    <!--second tweet-->
    <article class="hover:bg-gray-100 transition duration-350 ease-in-out">
    <div class="flex flex-shrink-0 p-4 pb-0">
    <a href="#" class="flex-shrink-0 group block">
    <div class="flex items-center">
    <div>
    <img class="inline-block h-10 w-10 rounded-full" src="${tweets.profile_img_url}" alt="">
    </div>
    <div class="ml-3">
    <p class="text-base leading-6 font-medium"> ${tweets.name}<span class="text-gray-400"> @ ${tweets.username}
    </span>
    <span
    class="text-sm leading-5 font-medium text-gray-400  transition ease-in-out duration-150">
    ${time}
    </span>
    </p>
    </div>
    </div>
    </a>
    </div>
    <div class="pl-16">
    <a href="/get_comments/${tweets.tweet_id}">
    <p class="text-base width-auto font-medium" style="word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">
    ${tweets.content}
    </p>
    <div class="size-fit pr-6 pt-3">
    <div class="">
    <img class="rounded" src="./uploads/${tweets.media_url}" alt="">
    </div></div></a>
    <div class="w-full">
    <div class="flex items-center py-4">
    <input type="hidden" name="tweet_id" value="${tweets.tweet_id}">
    <!-- comments span tag -->

    <div onclick="show('${tweets.tweet_id}')" class="flex-1 text-center"
                            data-modal-target="crud-modal" data-modal-toggle="crud-modal">
                            <span
                                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-400">
                                <svg class="text-center h-6 w-6" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                    </path>
                                </svg>
                            </span>
                        </div>

                        <!-- modal -->
                        <div id="crud-modal" tabindex="-1" aria-hidden="true"
                            class="comments_${tweets.tweet_id} hidden overflow-y-auto overflow-x-hidden top-0 -right-40 absolute justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div
                                class="relative w-full max-w-md max-h-full mx-auto my-10 h-full md:h-auto ml-[35%]">
                                <!-- Modal content -->
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                    <!-- Modal body -->
                                    <form class="p-4 md:p-5">
                                        <div class="flex justify-end">
                                            <span onclick="hide('${tweets.tweet_id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </span>

                                        </div>
                                        <div class="grid gap-4 mb-4 grid-cols-2">

                                            <div class="col-span-2">
                                                <textarea name="comment" id="comment" rows="4"
                                                    class="block p-2.5 w-full text-xl text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Post your reply"></textarea>
                                            </div>
                                        </div>

                                        <div class="flex justify-end"
                                            onclick="submitComment('${tweets.tweet_id}'); return false;">
                                            <span
                                                class="text-white cursor-pointer inline-flex items-center bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Reply</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class=" flex-1 text-center py-2 m-2" id="defaultModalButton">
                            <span
                                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-green-600">
                                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                </svg>
                            </span>
                        </div>



                        <!-- like span tag -->
                        <div class="flex-1 text-center py-2 m-2">

                            <span
                            class="w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-red-300">
`
        if (tweets.isLiked) {

            tweet += `
            <svg class="text-center h-7 w-6 fill-red-600 text-red-600 like_${tweets.tweet_id}"
            fill="none" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
            onclick="likeHandler('${tweets.tweet_id}')">
            <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
        </svg>`
        } else {
            tweet += ` <svg class="text-center h-7 w-6 text-gray-500 like_${tweets.tweet_id}"
            fill="none" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
            onclick="likeHandler('${tweets.tweet_id}')">
            <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
        </svg>`

        }

        tweet += ` </span> </div>`



        tweet += `       <!-- share span tag -->
                        <div class="flex-1 text-center py-2 m-2">
                        <span
                        class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-400">
                        <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        <!-- bookmark span tag -->
                        <div class="flex-1 text-center py-2 m-2 ">
        <span
            class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-300">`

        if (tweets.isBookmarked) {
            tweet += ` <svg class="text-center h-7 w-6 fill-blue-300 text-blue-800 bookmark_${tweets.tweet_id}
            fill="none" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
            onclick="bookmarkHandler('${tweets.tweet_id}')">
            <path
                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
            </path>
        </svg>`
        }
        else {
            tweet += `       <svg class="text-center h-7 w-6 bookmark_${tweets.tweet_id}"
    fill="none" stroke-linecap="round" stroke-linejoin="round"
    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
    onclick="bookmarkHandler('${tweets.tweet_id}')">
    <path
        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
    </path>
</svg> `
        }


        tweet += `   </span >
                        </div >
            `


        tweet += `<div class="flex-1 text-center py-2 m-2">
                <span href="#"
                    class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full  hover:text-blue-400">
                    <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </span>
</div >
                    </div >
                </div >


            </div >
            <hr class="border-gray-200">
            </article>
</li > `



    });




    return tweet;

}

