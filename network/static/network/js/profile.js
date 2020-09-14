var follower_count = received_data.followers_count;

document.addEventListener('DOMContentLoaded', function () {

  load_profile();
    // By default the index page is loaded

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
function load_profile(type) {

  document.querySelector("#name").innerHTML = received_data.name;
  document.querySelector("#page-name").innerHTML = "Profile";

  document.querySelector("#profile_img").src = received_data.image ;

  document.querySelector("#background-image").backgroundImage = "url('https://image.freepik.com/free-photo/room-with-concrete-floor-smoke-background_9083-2991.jpg')";
  //  tweet_element()
    try {
      updateFollowStats();
      document.querySelector('#follow-btn').addEventListener('click',()=>follow())
    } catch (error) {

    }


    user_posts.forEach(tweet =>
  document.querySelector("#tweets").appendChild(tweet_element(tweet)));

}
function updateFollowStats(){
    document.querySelector("#followers_count").innerHTML = follower_count;
    document.querySelector("#followings_count").innerText = received_data.followings_count ;
    document.querySelector('#follow-btn').innerHTML = is_followed ? "unfollow":"follow";
    document.querySelector('#follow-btn').style.backgroundColor = is_followed ? "red":"blue";


}
function follow(){
  fetch('/follow/', {
          method: 'POST',
          body: JSON.stringify({
              user: received_data.id,
          })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          follower_count = is_followed ? (follower_count-1) : (follower_count+1);
          is_followed = !(is_followed);

          updateFollowStats();
    });


}