async function fetchNotificatons() {
  try {
    let url = window.location.origin + "/get_notification";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    const notifications = await response.json();
    diplayNotifications(notifications);
  } catch (error) {
    console.error("Error while fetching notifications", error);
  }
}

count1 = document.getElementById("notification");
count1.addEventListener("click", async () => {
  let url = window.location.origin + "/post_notification";
  let data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_read: 1 }),
  });
  let response = await data.json();
});

let notificationContainer = document.getElementById("NotificationCount");
function diplayNotifications(notifications) {
  let notificationData = notifications.notificationCount;
  if (notificationData.length === 0) {
    notificationContainer.innerHTML = "0";
  } else {
    notificationData.forEach((countNotification) => {
      let count = `${countNotification.notificationCount}`;
      notificationContainer.innerHTML = count;
    });
  }
}

window.addEventListener("DOMContentLoaded", fetchNotificatons);
