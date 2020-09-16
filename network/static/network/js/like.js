document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.like-btn').forEach(element =>
        element.addEventListener('click',(e) => {
            // the element clicked
            likeBtn = e.currentTarget
            console.log(likeBtn)

            var like_count_element =  likeBtn.parentNode.querySelector('.like_count')
            var post_id = likeBtn.dataset.post_id
            var is_liked  = likeBtn.dataset.is_liked === 'true'

                fetch(`/like/`, {
                  method: 'PUT',
                  body: JSON.stringify({
                      post_id:post_id,
                  })
                }).then(response => response.json())
                  .then(result => {
                      // Print result
                      console.log(result)
                      is_liked = result.is_liked
                      likeBtn.style.color = is_liked ? "red":"gray";
                      like_count_element.dataset.like_count = result.like_count
                      like_count_element.innerText = result.like_count

                });


    }))
});