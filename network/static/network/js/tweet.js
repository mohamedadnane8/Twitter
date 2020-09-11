document.addEventListener('DOMContentLoaded', function () {

    document.querySelector("#tweet-submit").addEventListener('click', () => post_tweet());

    // By default the index page is loaded
    load_posts("all_tweets");

});

function post_tweet() {
    // Collect data
    alert("hi");
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

function load_posts(type) {
    document.querySelector("#tweets").innerHTML = '';
    document.querySelector("#page-name").innerHTML = 'All Posts';
    fetch(`/${type}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(tweet => {

                // Creating the data cell
                tweet_div = document.createElement("div");
                // Filling it
                tweet_div.innerHTML = ` <div class="row posts">
                                    <div class="col-md-12">
                                        <div class="card mt-4">
                                            <div class="card-body row">
                                                <div class="col-md-2 post-owner">
                                                    <a href="">
                                                        <img class="rounded-circle" src="${tweet.owner_image}" style="width: 6rem;height: 6rem;">
                                                    </a>
                                                    <a id="owner-name" style="text-align: center;display: block;">${tweet.owner}</a>
                                                    <span class="text-muted">${tweet.date_created}</span>
                                                   </div>
                                                <div class="col-md-10 content">
                                                    <p>${tweet.description}</p>
                                                </div>
                                                <div class="d-flex justify-content-around react"><a href="#">${tweet.likes}<i class="fa fa-heart"></i></a><a class="comment" href="#"><i class="fa fa-comment"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                //TODO: add an event listener to owner-name + image

                tweet_div.querySelectorAll("owner-name").forEach(a_item => {
                   a_item.addEventListener('click', () => load_profile(tweet.owner_id));
                });


                // appending it in the table in HTML
                document.querySelector("#tweets").appendChild(tweet_div);

            })


        });

}
function load_profile(id){

}
