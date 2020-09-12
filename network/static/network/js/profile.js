document.addEventListener('DOMContentLoaded', function () {
alert(`{{ data|safe }}`)
    //follow
    //load_profile();
    // By default the index page is loaded

});
// function load_profile(type) {
//     document.querySelector("#tweets").innerHTML = '';
//     fetch(`${window.location.pathname}`)
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(profile => {
//               document.querySelector("#page-name").innerHTML = data.user_info.name;
//
//                 // Creating the data cell
//
//
//                 // appending it in the table in HTML
//                 document.querySelector("#tweets").appendChild(tweet_element(profile.user_post));
//
//             })
//
//
//         });
//
// }
