// always start a js but console logging hello
const baseURL = "http://localhost:3000/cults/1";
const cultName = document.querySelector(".title");
const cultImage = document.querySelector(".image");
const cultCounter = document.querySelector(".bloodoaths");
const cultCounterButton = document.querySelector(".bloodoath-button");
const commentForm = document.querySelector(".comment-form");
const commentList = document.querySelector(".comments");
// always console log the above before bringing it into page!!

fetch(baseURL)
    .then((response) => response.json())
    .then((cult) => {
        cultName.textContent = cult.name
        cultImage.src = cult.img_url
        cultCounter.textContent = cult.count 

        cultCounterButton.addEventListener("click",() => {
            cult.count++;
            // cult increment needs to come BEFORE text changes, so
            // that text is changed to the updated number
            cultCounter.textContent = cult.count; 

            // need to increment on the back end so that
            // refresh doesn't go back to zero; this is "fetch w/options"
            fetch(baseURL,{
                // PATCH is all the data that we are sending to URL
                method: "PATCH",
                 //headers tell the back end what type of data it's getting; send api keys in headers
                // kind of like metadata for a fetch request
                // the "content-type..." etc below is something to memorize
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    //this is the argument of the things we want to change on the back end
                    // update the value of the matching-object-by-id at the key of count 
                    //this is telling the back end what's going on in our code above (i.e. cult.count++)
                    count: cult.count,
                })
            })
        });
        // the form's default option is to POST
        commentForm.addEventListener('submit',(event) => {
            // prevent submit from refreshing
            event.preventDefault();
            const commentItem = document.createElement('li');
            // the below code allows you to take data directly from your form
            // the target in event.target is the element
            const formData = new FormData(event.target);
            // the name input on the back end knows how to update data because of name attribute in 
            // html form language that matches. lets us access the input
            commentItem.textContent = formData.get("comment");
            commentList.append(commentItem);
        })
    });

    // 5 things you can do with fetch: post (create), 
    // patch (update), put (update), delete, get AKA DEFAULT (show you what is in your backend)
    // CRUD ACTIONS: create, read, update, destroy 

    // make it work, make it look pretty, make it work faster!