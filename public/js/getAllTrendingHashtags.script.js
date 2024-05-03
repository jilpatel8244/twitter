async function getAllTrendinghashtags () {
    let url = window.location.origin + `/aside/getAllTrendingHashtags`;

    let data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'showMore': 0 }),
    });

    let response = await data.json();

    if (response.success === true) {
        let trendingHashtagComponent = document.createElement('div');

        if (response.message.length) {
            response.message.forEach((element, index) => {
                let newDiv = document.createElement('div');

                newDiv.innerHTML = `
                <div class="flex">
                    <div class="flex-1">
                        <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">${index+1} . Trending</p>
                        <h2 class="px-4 ml-2 w-48 font-bold ">#${element.hashtag_name}</h2>
                        <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">${element.count} Tweets</p>
                    </div>
                </div>
                <hr class="border-gray-100">`

                trendingHashtagComponent.appendChild(newDiv);
            });
        } else {
            let newDiv = document.createElement('div');

            newDiv.innerHTML = `
                    <div class="flex-1">
                        <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">no trends right now</p>
                    </div>`;

            trendingHashtagComponent.appendChild(newDiv);
        }

        document.getElementById('trendingTweetContainer').appendChild(trendingHashtagComponent);

    } else {
        // display toast
        console.log(response.message);
    }
}
getAllTrendinghashtags();



