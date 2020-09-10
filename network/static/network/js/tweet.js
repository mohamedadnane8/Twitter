document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  load_index();
  load_posts();
  document.querySelector('#tweet-btn').addEventListener('click', () => compose_tweet());

  document.querySelector('#tweet-form').style.display = 'none';

  // By default, load the inbox
});

function compose_tweet() {

  // Show compose view and hide other views

  document.querySelector('#wrapper').style.display = 'none';
  document.querySelector('#tweet-form').style.display = 'block';
  document.querySelector('#tweet-submit').addEventListener('click',()=>post_tweet());
  // Clear out composition fields

}
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
  load_index();
}
function load_index(){
  document.querySelector('#wrapper').style.display = 'block';
  document.querySelector('#tweet-form').style.display = 'none';
}
function load_posts(){
  alert("hi");
  document.querySelector("#tweets").innerHTML = '';

  fetch(`/all_tweets`)
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
                                                <div class="col-md-2 post-owner"><img class="rounded-circle" src="${tweet.owner_image}" style="width: 6rem;height: 6rem;">
                                                    <p id="owner-name" style="text-align: center;">${tweet.owner}</p><span class="text-muted">${tweet.date_created}</span></div>
                                                <div class="col-md-10 content">
                                                    <p>${tweet.description}</p>
                                                </div>
                                                <div class="d-flex justify-content-around react"><a href="#">${tweet.likes}<i class="fa fa-heart"></i></a><a class="comment" href="#"><i class="fa fa-comment"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
          // coloring read emails

          // tweet_div.querySelectorAll("a").forEach(a_item => {
          //   a_item.addEventListener('click', () => load_email(element.id));
          // });


          // appending it in the table in HTML
          document.querySelector("#tweets").appendChild(tweet_div);

        })


      });

}