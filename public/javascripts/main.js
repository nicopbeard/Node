/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



//button event for create
document.getElementById("create")
.addEventListener("click",function(e){
    console.log("create")
    //create a new user nicopbeard
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: 
        JSON.stringify({
            "Username" : "nicopbeard",
            "Name" : "Nico",
            "Bio" : "From San Francisco, CA",
            "Date" : "10/16/2020"
        })
    });
},false);

//button event for read
document.getElementById("read")
.addEventListener("click",function(e){
    console.log("read")
    //send a get request and return the users
    fetch('/users')
    .then(response => response.json())
    .then(data => console.log(data));
},false);

//button event for update
document.getElementById("update")
.addEventListener("click",function(e){
    console.log("update")
    //send a put request to update user nicopbeard's bio
    fetch('/users/nicopbeard', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: 
        JSON.stringify({
            "Username" : "nicopbeard",
            "Name" : "Nico",
            "Bio" : "From San Francisco, CA and Madrid, Spain",
            "Date" : "10/16/2020"
        })
    });
},false);

//button event for destroy
document.getElementById("destroy")
.addEventListener("click",function(e){
    console.log("destroy")
    //send a delete request for user nicopbeard
    fetch('/users/nicopbeard', {
        method: 'DELETE'
    });
},false);

};