let alluserBtn = document.getElementById("alluser");
let alluserContent = document.getElementById("allusercontent");

let verifiedBtn = document.getElementById("verified");
let verifiedContent = document.getElementById("verifiedcontent");
let mentionBtn = document.getElementById("mention");
let mentionContent = document.getElementById("mentioncontent");
alluserBtn.style.color = "blue";

alluserBtn.addEventListener("click", function () {
  alluserContent.style.display = "block";
  mentionContent.style.display = "none";
  verifiedContent.style.display = "none";
  alluserBtn.style.color = "blue";
  mentionBtn.style.color = "black";
  verifiedBtn.style.color = "black";
});
verifiedBtn.addEventListener("click", function () {
  alluserContent.style.display = "none";
  mentionContent.style.display = "none";
  verifiedContent.style.display = "block";
  alluserBtn.style.color = "black";
  mentionBtn.style.color = "black";
  verifiedBtn.style.color = "blue";
});

mentionBtn.addEventListener("click", function () {
  alluserContent.style.display = "none";
  mentionContent.style.display = "block";
  verifiedContent.style.display = "none";
  mentionBtn.style.color = "blue";
  alluserBtn.style.color = "black";
  verifiedBtn.style.color = "black";
});

async function fetchNotificatons() {
  try {
    let url = window.location.origin + "/notification";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    const notifications = await response.json();
    // console.log(notifications);
    diplayNotifications(notifications);
  } catch (error) {
    console.error("Error while fetching notifications", error);
  }

  function diplayNotifications(notifications) {
    const notificationContainer = document.getElementById("allusercontent");
    const mentionContainer = document.getElementById("mentioncontent");
    const verifiedContainer = document.getElementById("verifiedcontent");

    let simpleData = notifications.notifications;
    notificationContainer.innerHTML = "";

    simpleData.forEach((notification) => {
      let notificationHTML = "";
      switch (notification.type) {
        case "Password_reset":
          notificationHTMl = `
  <div
    class="  w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
    <div class="flex">
      <img
        class="w-10 h-10 p-1 rounded-full"
        src="/assets/lock.png"
        alt="Bordered avatar"
      />
      <div class="mt-2">
        Your password was reset on your account. Based on this change,
        additional changes to your account may be restricted temporarily.
      </div>
    </div>
  </div>`;
          break;
        case "Login":
          notificationHTML = `  
  <div
    class=" w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
    <div class="flex">
      <img
        class="w-10 h-10 p-1 rounded-full"
        src="/assets/lock.png"
        alt="Bordered avatar"
      />
      <div class="mt-2">
        There was a login to your account  @ ${notification.related_username}  from a
        new device on ${notification.created_at}. Review it now.
      </div>
    </div>
  </div>`;
          break;
        case "Follow":
          notificationHTML = `
  <div
    class="  w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
    <a href="/profile/?id=${notification.user_id}"> 
      <div class="flex">
      <img
        class="w-10 h-10 p-1 rounded-full"
        src="/assets/user-icon.png"
        alt="Bordered avatar"
      />
      <img
        class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="/assets/user.png"
        alt="Bordered avatar"
      />
      <div class="notification mt-2 flex flex-col ml-2">
        <span>${notification.related_username} followed you</span>
      </div>
     </div>
    </a>
  </div>`;
          break;
        case "Comment":
          notificationHTML = `
        
  <div
    class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
  <a href="/home/?tweet_id=${notification.tweet_id}"> 
    <div class="flex">
      <img
        class="w-15 h-10 p-1 rounded-full"
        src="/assets/message.png"
        alt="like icon"
      />
      <img
        class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="/assets/user.png"
        alt="Bordered avatar"
      />

      <div class="notification ml-2 flex flex-col mt-2">
        <span>${notification.related_username} commented on your post</span>
      </div>
    </div>
    <div class="ml-2 mt-2"> ${notification.tweet_content}</div>
    </a>
  </div>
    `;
          break;
        case "Like":
          notificationHTML = `
  <div
    class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
  <a href="/home/?tweet_id=${notification.tweet_id}"> 
    <div class="flex">
      <img
        class="w-10 h-10 p-1 rounded-full"
        src="/assets/heart_like.png"
        alt="like icon"
      />
      <img
        class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="/assets/user.png"
        alt="Bordered avatar"
      />

      <div class="ml-2 flex flex-col mt-2">
        <span>${notification.related_username} liked your post</span>
      </div>
    </div>
    <div class="ml-2 mt-2">${notification.tweet_content}</div>
    </a>
  </div>`;
          break;
        case "Retweet":
          notificationHTML = ` <div
    class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
  >
  <a href="/home/?tweet_id=${notification.tweet_id}"> 
    <div class="flex">
      <img
        class="w-15 h-10 p-1 rounded-full"
        src="/assets/retweet.jpg"
        alt="retweet icon"
      />
      <img
        class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="/assets/user.png"
        alt="Bordered avatar"
      />

      <div class="notification ml-2 flex flex-col mt-2">
        <span>${notification.related_username} retweet your post</span>
      </div>
    </div>
    <div class="ml-2 mt-2"> ${notification.tweet_content}</div>
    </a>
  </div>
`;
          break;
        default:
          console.warn(`Unknown notification type: ${notification.type}`);
      }
      notificationContainer.innerHTML += notificationHTML;
    });

    let verifiedData = notifications.verifiedNotification;
    verifiedContainer.innerHTML = "";

    verifiedData.forEach((verifiednotification) => {
      let verifiedHTML = "";
      switch (verifiednotification.type) {
        case "Follow":
          verifiedHTML = `
              <div
                class="  w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
                <a href="/profile/?id=${verifiednotification.user_id}">
                  <div class="flex">
                  <img
                    class="w-10 h-10 p-1 rounded-full"
                    src="/assets/user-icon.png"
                    alt="Bordered avatar"
                  />                  
                  <img
                    class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/assets/user.png"
                    alt="Bordered avatar"
                  />
                  <img
                    class="w-10 h-10 p-1 rounded-full"
                    src="/assets/Twitter_Verified.png"
                    alt="Bordered avatar"
                  />
                  <div class="notification mt-2 flex flex-col ml-2">
                    <span><strong>${verifiednotification.related_user_name} </strong> followed you</span>
                  </div>
                 </div>
                </a>
              </div>`;
          break;
        case "Comment":
          verifiedHTML = `

              <div
                class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
              <a href="/home/?tweet_id=${verifiednotification.tweet_id}">
                <div class="flex">
                  <img
                    class="w-15 h-10 p-1 rounded-full"
                    src="/assets/message.png"
                    alt="like icon"
                  />
                  <img
                    class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/assets/user.png"
                    alt="Bordered avatar"
                  />

                  <div class="notification ml-2 flex flex-col mt-2">
                    <span><strong>${verifiednotification.related_user_name} </strong> commented on your post</span>
                  </div>
                </div>
                <div class="ml-2 mt-2"> ${verifiednotification.tweet_content}</div>
                </a>
              </div>
                `;
          break;
        case "Like":
          verifiedHTML = `
              <div
                class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
              <a href="/home/?tweet_id=${verifiednotification.tweet_id}">
                <div class="flex">
                  <img
                    class="w-10 h-10 p-1 rounded-full"
                    src="/assets/heart_like.png"
                    alt="like icon"
                  />
                  <img
                    class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/assets/user.png"
                    alt="Bordered avatar"
                  />

                  <div class="ml-2 flex flex-col mt-2">
                    <span><strong>${verifiednotification.related_user_name} </strong> liked your post</span>
                  </div>
                </div>
                <div class="ml-2 mt-2">${verifiednotification.tweet_content}</div>
                </a>
              </div>`;
          break;
        case "Retweet":
          verifiedHTML = ` <div
                class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
              <a href="/home/?tweet_id=${verifiednotification.tweet_id}">
                <div class="flex">
                  <img
                    class="w-15 h-10 p-1 rounded-full"
                    src="/assets/retweet.jpg"
                    alt="retweet icon"
                  />
                  <img
                    class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/assets/user.png"
                    alt="Bordered avatar"
                  />

                  <div class="notification ml-2 flex flex-col mt-2">
                    <span><strong>${verifiednotification.related_user_name} </strong> retweet your post</span>
                  </div>
                </div>
                <div class="ml-2 mt-2"> ${verifiednotification.tweet_content}</div>
                </a>
              </div>
         `;
          break;
        case "Mention":
          verifiedHTML = `<div
                class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              >
              <a href="/home/?tweet_id=${verifiednotification.tweet_id}">
                <div class="flex">

                  <img
                    class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="/assets/user.png"
                    alt="Bordered avatar"
                  />

                  <div class="notification ml-2 flex flex-col">
                    <span><strong>${verifiednotification.related_user_name} </strong>
                      @${verifiednotification.related_username} ~ ${verifiednotification.time}</span>
                      <span> <strong>Mentioned you</strong> in their tweet </span>
                  </div>
                </div>
                <div class="ml-4 mt-4"> ${verifiednotification.tweet_content}</div>
                </a>
              </div>`;
          break;
        default:
          console.warn(
            `Unknown notification type: ${verifiednotification.type}`
          );
      }
      verifiedContainer.innerHTML += verifiedHTML;
    });

    let mentionData = notifications.mentionNotification;
    mentionContainer.innerHTML = "";
    mentionData.forEach((mentionNotification) => {
      let mentionHTML = "";
      mentionHTML = `<div
      class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    >
    <a href="/home/?tweet_id=${mentionNotification.tweet_id}"> 
      <div class="flex">
        
        <img
          class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="/assets/user.png"
          alt="Bordered avatar"
        />
  
        <div class="notification ml-2 flex flex-col mt-2">
          <span><strong>${mentionNotification.related_user_name} </strong>
            @${mentionNotification.related_username} ~ ${mentionNotification.time}</span>
        </div>
      </div>
      <div class="ml-2 mt-2"> ${mentionNotification.tweet_content}</div>
      </a>
                     </div>`;
      mentionContainer.innerHTML += mentionHTML;
    });

    // console.log(notifications);
    // let verifiedTweets = notifications.premiumTweet;
    // console.log(verifiedTweets);
    // verifiedTweets.forEach((verifiedTweet) => {
    //   let verifiedTweetHTML = "";
    //   if (verifiedTweet.type === "Tweet") {
    //     verifiedTweetHTML = ` <div
    //   class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    // >
    // <a href="/home/?tweet_id=${verifiedTweet.tweet_id}">
    //   <div class="flex">
    //     <img
    //       class="w-15 h-10 p-1 rounded-full"
    //       src="/assets/message.png"
    //       alt="like icon"
    //     />
    //     <img
    //       class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
    //       src="/assets/user.png"
    //       alt="Bordered avatar"
    //     />

    //     <div class="notification ml-2 flex flex-col mt-2">
    //       <span><strong>${verifiedTweet.username} </strong> post a tweet</span>
    //     </div>
    //   </div>
    //   <div class="ml-2 mt-2"> ${verifiedTweet.tweet_content}</div>
    //   </a>
    // </div>`;
    //     verifiedContainer.innerHTML += verifiedTweetHTML;
    //   }
    // });
  }
}
// window.addEventListener("load", fetchNotificatons);
window.addEventListener("DOMContentLoaded", fetchNotificatons);
