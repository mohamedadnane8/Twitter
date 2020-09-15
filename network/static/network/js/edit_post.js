document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.post-edit').addEventListener('click',(e) => {
        // the element clicked
        edit_a = e.currentTarget

        var post_description =  edit_a.parentNode.querySelector('.description-txt')
        // Creating the textarea
        var text_area = document.createElement('textarea')
        text_area.innerHTML = post_description.innerHTML
        // Creating the save button
        var save_a = document.createElement('a')
        save_a.href = "#"
        save_a.innerText = "save"

        post_description.parentNode.replaceChild(text_area, post_description)
        edit_a.parentNode.replaceChild(save_a,edit_a)

        save_a.addEventListener('click',()=>{

        })

    })
});