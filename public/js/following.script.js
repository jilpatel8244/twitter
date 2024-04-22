
const foryou = async() => {
    console.log("bla");
    document.querySelector('#foryou').style.display = "block";
    document.querySelector('#following').style.display = "none";
}

const following = async() => {
    console.log("bla");
    // let url = window.location.origin + "/following";
    // const response = await fetch(url);
     
    // if (!response.ok) {
    //     throw new Error("Failed to fetch following");
    // }
    // let following = await response.json();
    //   let followingData = following.following;
    //   console.log(followingData);
    document.querySelector('#foryou').style.display = "none";
    document.querySelector('#following').style.display = "block";


}