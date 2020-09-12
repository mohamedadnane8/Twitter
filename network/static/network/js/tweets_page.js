document.addEventListener('DOMContentLoaded', function () {


    // By default the index page is loaded
    load_posts("all_tweets");
});
function tweet_element(tweet){
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
                                      <a href = "profile/${tweet.owner_id}"id="owner-name" style="text-align: center;display: block;"><b>${tweet.owner}</b></a>
                                      <span class="text-muted">${tweet.date_created}</span>
                                     </div>
                                  <div class="col-md-10 content">
                                      <p style="font-size:20px;">${tweet.description}</p>
                                  </div>
                                  <div class="d-flex justify-content-around react"><a href="#">${tweet.likes}<i class="fa fa-heart"></i></a><a class="comment" href="#"><i class="fa fa-comment"></i></a></div>
                              </div>
                          </div>
                      </div>
                  </div>`
    return tweet_div;
}
function load_posts(type) {
    document.querySelector("#tweets").innerHTML = '';
    document.querySelector("#page-name").innerHTML = 'All Posts';
    fetch(`/${type}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(tweet => {

                // Creating the data cell


                // appending it in the table in HTML
                document.querySelector("#tweets").appendChild(tweet_element(tweet));

            })


        });

}
