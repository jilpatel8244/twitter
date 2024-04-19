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

    // console.log(notifications.countNotification);
    const allcount = document.getElementById("allusercount");
    allcount.innerHTML = notifications.countNotification - 1 + "+";
    
    let simpleData = notifications.notifications;
    simpleData.forEach((notification) => {
      let notificationHTML = "";
      notificationHTML = `<div class="mt-2 flex items-center justify-center flex-col">
          <span class="mt-2 font-medium text-2xl">Nothing to see here — yet</span>
          <span class="mt-2 font-medium text-sm">
            When some notification arrive, you’ll find it here.
          </span>
        </div>`;
      notificationHTML = "";
      switch (notification.type) {
        case "Mention":
          notificationHTML = `
        <div
            class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
          <a href="/home/?tweet_id=${notification.tweet_id}"> 
            <div class="flex">
              
              <img
                class="w-10 h-10 ml-2 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src="/assets/user.png"
                alt="Bordered avatar"
              />
        
              <div class="notification ml-2 flex flex-col mt-2">
                <span><strong>${notification.related_user_name} </strong>
                  Mentioned you</span>
              </div>
            </div>
            <div class="ml-2 mt-2"> ${notification.tweet_content}</div>
            </a>
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
    let loginData = notifications.logNotification;
    loginData.forEach((lognotification) => {
      let loginHTML = "";
      switch (lognotification.type) {
        case "Password_reset":
          loginHTML = `
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
          loginHTML = `  
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
        There was a login to your account  @ ${lognotification.username}  from a
        new device on ${lognotification.created_at}. Review it now.
      </div>
    </div>
  </div>`;
          break;
        default:
          console.warn(`Unknown notification type: ${lognotification.type}`);
      }
      notificationContainer.innerHTML += loginHTML;
    });

    let verifiedData = notifications.verifiedNotification;

    if (verifiedData.length < 1) {
      let noVerifiedHTML = "";
      noVerifiedHTML = ` <div class="mt-2 flex items-center justify-center flex-col">
      <img
        class="p-1 rounded-full"
        src="/assets/verifiedpage.png"
        alt="Bordered avatar"
      />
      <span class="mt-2 font-medium text-2xl">Nothing to see here — yet</span>
      <p class="w-72">
        Likes, mentions, reposts, and a whole lot more — when it comes from a
        verified account, you’ll find it here.
        <a href="#" class="text-blue-700">Learn more</a>
      </p>
    </div>`;
      verifiedContainer.innerHTML += noVerifiedHTML;
    } else {
      verifiedData.forEach((verifiednotification) => {
        let verifiedHTML = "";
        switch (verifiednotification.type) {
          case "Tweet":
            verifiedHTML = `<div
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
                <span><strong>${verifiednotification.username} </strong> post a tweet</span>
              </div>
            </div>
            <div class="ml-2 mt-2"> ${verifiednotification.tweet_content}</div>
            </a>
          </div>`;
            break;
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
                    <span><strong>${verifiednotification.related_user_name} </strong> followed  <strong> ${verifiednotification.username}</strong></span>
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
                    <span><strong>${verifiednotification.related_user_name} </strong> commented on <strong> ${verifiednotification.username}'s</strong> post</span>
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
                    <span><strong>${verifiednotification.related_user_name} </strong> liked  <strong> ${verifiednotification.username}'s</strong> post</span>
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
                    <span><strong>${verifiednotification.related_user_name} </strong> retweet  <strong> ${verifiednotification.username}'s</strong> post</span>
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
                      <span> <strong>Mentioned ${verifiednotification.username}</strong> in their tweet </span>
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
    }

    let mentionData = notifications.mentionNotification;
    if (mentionData.length < 1) {
      let noMentionHTML = "";
      noMentionHTML = `<div class="mt-2 flex items-center justify-center flex-col">
      <span class="mt-2 font-medium text-2xl">Nothing to see here — yet</span>
      <span class="mt-2 font-medium text-sm">
        When someone mentions you, you’ll find it here.
      </span>
    </div>`;
      mentionContainer.innerHTML += noMentionHTML;
    } else {
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
    }
  }
}

// window.addEventListener("load", fetchNotificatons);
window.addEventListener("DOMContentLoaded", fetchNotificatons);
