
function deletePost(postId) {
  fetch(`home/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    location.reload()
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
