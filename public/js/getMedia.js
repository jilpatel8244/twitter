function mediaFunction(data) {

  let userMedia = `<ul class=' list-none grid grid-cols-2 my-5'>`;

  data.forEach(element => {
    userMedia += `<li class='my-2 mx-2'> 
    <center><img class="object-scale-down border rounded-lg" src="./uploads/${element.media_url}" alt="error"/></center>
    </li>`
  });
  userMedia += `</ul>`;


  return userMedia;
}