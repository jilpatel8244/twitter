function getFollowersList (data) {
    let users = ``;

    data.forEach(element => {
        users += `<div id="${element.id}" class="flex items-center justify-between cursor-pointer" onclick="selectUnselectHandler('${element.id}', '${element.name}')">
                    <div class="flex flex-shrink-0 p-4 my-2">
                        <div class="flex-shrink-0 group block">
                            <div class="flex items-center">
                                <div>`
                                    if(element.profile_img_url) {
                                        users += `<img class="inline-block h-10 w-10 rounded-full"
                                            src="/uploads/${element.profile_img_url}" alt="" id="profileImg${element.id}"/>`
                                    } else {
                                        users += `<img class="inline-block h-10 w-10 rounded-full"
                                            src="/assets/profile.png" alt="" id="profileImg${element.id}"/>`
                                    }
                                users += `</div>
                                <div class="ml-3">
                                    <p class="text-base leading-6 font-medium text-black">
                                        ${element.name}
                                            <span
                                                class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                @${element.username}
                                            </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 hidden tickmark">
                        <div class="flex justify-center items-center">
                            <img src="/assets/check-solid.svg" alt="check-sign" height="15px" width="15px" />
                        </div>
                    </div>
                </div>`       
    });

    return users;
}

let selectedUserArr = [];

function selectUnselectHandler(userId, name) {
    if (!selectedUserArr.includes(userId)) {
        // add in selectedUserArr
        selectedUserArr.push(userId);

        // display tickmark
        let tickmark = document.getElementById(userId).querySelector('.tickmark');
        tickmark.classList.remove('hidden');

        // add span to header
        let newDiv = document.createElement('div');
        newDiv.classList.add('p-1');
        newDiv.setAttribute('id','header'+userId);

        newDiv.innerHTML = `
            <div class="flex items-center border p-1 rounded-2xl">
                <div class="pr-1">
                    <img class="inline-block h-5 w-5 rounded-full" src="${document.getElementById(`profileImg${userId}`).src}" alt="profileImg"/>
                </div>
                <div>
                    <p>${name}</p>
                </div>
            </div>
        `;

        document.getElementById('selectedFollowers').appendChild(newDiv);
    } else {
        // remove from selectedUserArr
        selectedUserArr.splice(selectedUserArr.indexOf(userId), 1);
        
        // remove tickmark
        let tickmark = document.getElementById(userId).querySelector('.tickmark');
        tickmark.classList.add('hidden');

        // remove span to header
        document.getElementById('header'+userId).remove();
    }

    if(selectedUserArr.length) {
        document.getElementById('shareTweetUsingDirectMessageButton').disabled = false;
    } else {
        document.getElementById('shareTweetUsingDirectMessageButton').disabled = true;
    }
}