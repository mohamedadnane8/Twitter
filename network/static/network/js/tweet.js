document.addEventListener('DOMContentLoaded', function () {

    document.querySelector("#tweet-submit").addEventListener('click', () => post_tweet());

    // By default the index page is loaded

});

function post_tweet() {
    // Collect data
    let description = document.querySelector('#description').value;
    // Sending the email!
    fetch('/tweet', {
        method: 'POST',
        body: JSON.stringify({
            description: description
        })
    })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
        });

    $('#myModal').modal('hide');

}
