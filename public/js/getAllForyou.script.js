async function getHomeForyouHandler() {
  let element = document.querySelector("#foryou_btn");
  element.style.borderBottom = "10px solid rgba(59, 130, 246, 0.5)";
  element.style.borderBottomWidth = "4px";
  document.querySelector("#following_btn").style.borderBottom = "none";

  let url = window.location.origin + "/getHomeForyou";

  let data = await fetch(url, {
    method: "GET",
  });

  let response = await data.json();
  let allTweets = document.getElementById("allTweets");

  // function swap(arr, xp, yp) {
  //   var temp = arr[xp];
  //   arr[xp] = arr[yp];
  //   arr[yp] = temp;
  // }

  // function selectionSort(arr, n) {
  //   var i, j, min_idx;

  //   // One by one move boundary of unsorted subarray
  //   for (i = 0; i < n - 1; i++) {
  //     // Find the minimum element in unsorted array
  //     min_idx = i;
  //     for (j = i + 1; j < n; j++)
  //       if (arr[j].time < arr[min_idx].time) min_idx = j;

  //     // Swap the found minimum element with the first element
  //     swap(arr, min_idx, i);
  //   }
  // }

  // function printArray(arr, size) {
  //   var i;
  //   for (i = 0; i < size; i++) document.write(arr[i] + " ");
  //   document.write(" <br>");
  // }

  // let arr = [...response.message.rows, ...response.message.retweetData];

  // var n = arr.length;
  // // selectionSort(arr, n);
  // // printArray(arr, n);
  // let dates = []
  // for (i = 0; i < arr.length; i++) {
  //   dates.push(new Date(arr[i].created_at));
  //   // dates.push(new Date(arr[i].retweetTime));
  //   // console.log((Math.min(arr[i].time),Math.min( arr[i].retweetTime)));
  // }
  // console.log(arr);
  // console.log(dates);

  if (response.success == true) {
    if (response.message) {
      let tweet = getRetweetComponent(response.message.rows);
      allTweets.innerHTML += tweet;
    } else {
      allTweets.innerHTML = `<div class="w-3/5 mx-auto my-8">
                                        <div class="mb-3">
                                            <h2 class="font-bold text-3xl">Welcome to X!</h2>
                                        </div>
                                        <div class="mb-3">
                                            <p style="color: rgb(83, 100, 113);">This is the best place to see what’s happening in your world. Find some people and topics to follow now.</p>
                                        </div>
                                    </div>`;
    }
  }
}
