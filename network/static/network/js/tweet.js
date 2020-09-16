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
            try {
                document.querySelector('#recent-tweet').prepend(tweet_element(result.tweet));
            }catch(error){
               console.log(error);

            }
        });

    $('#myModal').modal('hide');

}

function tweet_element(tweet){
  tweet_div = document.createElement("div");
  // Filling it
    tweet_div.innerHTML = ` 
                       <div class="col-md-12" class = "post" data-postid = "${ tweet.id }">
          <div class="card mt-4">
              <div class="card-body row">
                  <div class="col-md-2 post-owner">
                      <a href= " profile/${tweet.owner.id} ">
                          <img class="rounded-circle" src="${ tweet.owner.image }" style="width: 6rem;height: 6rem;">
                      </a>
                      <a href = " profile/${tweet.owner.id} " id="owner-name" style="text-align: center;display: block;"><b>${ tweet.owner.name }</b></a>
                      <span class="text-muted">${ tweet.date_created }</span>
                     </div>
                  <div class="col-md-10 content">
                      <p style="font-size:20px;" class = "description-txt" data-post_id = "${ tweet.id }">${ tweet.description }</p>
                      <button type="button" class = "btn btn-primary post-edit" data-post_id = "${ tweet.id }">Edit</button>
                  </div>
                  <div class="d-flex justify-content-around react">
                      <div class = "row">
                          <a style="color:dodgerblue;" class="like_count" data-like_count = "${ tweet.likes_count }">${ tweet.likes_count }</a>
                          <a type="button" class = "like-btn" data-post_id = "${ tweet.id }"data-is_liked = "false"style="color:gray;">
                              <i class="fa fa-heart"></i>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
`;
    tweet_div.querySelector('.like-btn').addEventListener('click',(e) => like(e))
    tweet_div.querySelectorAll('.post-edit').addEventListener('click',(e) => edit_post(e))

    return tweet_div;
}