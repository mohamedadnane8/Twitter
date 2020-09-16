
var followers_count;
var is_followed;
var user_id;
document.addEventListener('DOMContentLoaded', function () {

  try {
      follow_btn = document.querySelector('#follow-btn');
      // get data from the dataset
      is_followed = follow_btn.dataset.is_followed === "true"
      console.log(typeof is_followed)
      user_id = parseInt(follow_btn.dataset.user_id)
      followers_count =  parseInt(follow_btn.dataset.followers_count)

      //creating and adding event listener to the follow btn
      updateFollowStats();
      follow_btn.addEventListener('click',()=>follow())
    } catch (error) {

    }
    // By default the index page is loaded

});


function updateFollowStats(){

    document.querySelector("#followers_count").innerHTML = followers_count;
    document.querySelector('#follow-btn').innerHTML = is_followed ? "unfollow":"follow";
    document.querySelector('#follow-btn').style.backgroundColor = is_followed ? "red":"blue";


}
function follow(){
  fetch('/follow/', {
          method: 'POST',
          body: JSON.stringify({
              user: user_id,
          })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
          followers_count = result.followers_count
          is_followed = result.is_followed
          updateFollowStats();
    });

}