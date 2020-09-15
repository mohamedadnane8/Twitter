document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.like-btn').forEach(element =>
        element.addEventListener('click',(e) => {
            // the element clicked
            likeBtn = e.currentTarget

            var like_count_element =  edit_a.parentNode.querySelector('.like_count')
            var post_id = likeBtn.dataset.post_id
            var is_liked  = likeBtn.dataset.is_liked === 'true'


            // Creating the textarea
            var text_area = document.createElement('textarea')
            text_area.innerHTML = post_description.innerHTML
            // Creating the save button
            var save_a = document.createElement('a')
            save_a.href = "#"
            save_a.innerText = "save"

            post_description.parentNode.replaceChild(text_area, post_description)
            edit_a.parentNode.replaceChild(save_a,edit_a)

            save_a.addEventListener('click',()=>{
                description = text_area.value;
                fetch(`/editPost/`, {
                  method: 'PUT',
                  body: JSON.stringify({
                      description:description,
                      post_id:post_id,
                  })
                }).then(response => response.json())
                  .then(result => {
                      // Print result
                      console.log(result.description)
                      post_description.innerHTML = result.description
                      text_area.parentNode.replaceChild(post_description,text_area)
                      save_a.parentNode.replaceChild(edit_a,save_a)
                });

            })

    }))
});