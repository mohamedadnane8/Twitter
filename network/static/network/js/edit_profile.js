document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#edit-save-btn').addEventListener('click',()=>{
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
        }).then(response => response.json())
                  .then(result => {
                      // Print result
                      console.log(result)
                      document.querySelector('#name').innerText = result.updated_info.name
                      document.querySelector('#image').src = result.updated_info.image
                      document.querySelector('#about').innerText = result.updated_info.about
                  });


    })
    // By default the index page is loaded

});