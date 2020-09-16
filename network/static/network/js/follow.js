document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.like-btn').addEventListener('click',()=>{
        username = document.querySelector('#edit-username').value
        image = document.querySelector('#edit-image').value
        about = document.querySelector('#edit-about').value
        fetch(`/edit/`, {
          method: 'PUT',
          body: JSON.stringify({
              username: username,
              image: image,
              about:about,
          })
        });

    })
    // By default the index page is loaded

});