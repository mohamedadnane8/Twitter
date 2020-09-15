document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#edit-save-btn').addEventListener('click',()=>{
        username = document.querySelector('#edit-username').value
        image = document.querySelector('#edit-image').value
        about = document.querySelector('#edit-about').value
        alert(`${username} ${image} ${about}`)
        fetch(`/edit/`, {
          method: 'PUT',
          body: JSON.stringify({
              username: username,
              image: image,
              about:about,
          })
        });
        alert(`done`)

    })
    // By default the index page is loaded

});