async function getAllTrendinghashtags () {
    let url = window.location.origin + `/aside/getAllSuggestionsAboutWhoToFollow`;

    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'showMore': 0 }),
    });

    let response = await data.json();

    if (response.success === true) {
        let whoToFollowComponent = document.createElement('div');

        if (response.message.length) {
            response.message.forEach((element, index) => {
                let newDiv = document.createElement('div');

                newDiv.innerHTML = `
                <div class="flex flex-shrink-0 ">
                    <div class="flex-1">
                        <a class="flex items-center w-48" href="/explore/profile?id=${element.id}">
                            <div>
                                <img class="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                                    src=${(element.profile_img_url) ? (`uploads/` + element.profile_img_url) : ("assets/profile.png")}
                                    alt="">
                            </div>
                            <div class="ml-3 mt-3">
                                <p class="text-base leading-6 font-medium ">
                                    ${element.name}
                                </p>
                                <p
                                    class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @${element.username}
                                </p>
                            </div>
                        </a>

                    </div>
                    <div class="flex-1 px-4 py-2 m-2">
                        <a href="" class=" float-right">
                            <input type="button" class="font-semibold text-white bg-black py-2 px-4 rounded-full"
                               value="Follow"
                            />
                        </a>

                    </div>
                </div>
                <hr class="border-gray-100">`

                whoToFollowComponent.appendChild(newDiv);
            });
        } else {
            let newDiv = document.createElement('div');

            newDiv.innerHTML = `
                    <div class="flex-1">
                        <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">nothing to see here right now</p>
                    </div>`;

            whoToFollowComponent.appendChild(newDiv);
        }

        document.getElementById('whoToFollowContainer').appendChild(whoToFollowComponent);

    } else {
        // display toast
        console.log(response.message);
    }
}
getAllTrendinghashtags();



