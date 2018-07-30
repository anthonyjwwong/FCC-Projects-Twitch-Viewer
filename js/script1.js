"use strict";

const domElement = {
    input: document.querySelector('.channel_input'),
    button: document.querySelector('.channel_button'),
    channels: document.querySelector('.channel_body')
};

const calls = {
    url: "https://wind-bow.glitch.me/twitch-api/",
    channels: "channels/",
    streams: "streams/"
};

const apiCalls = (type) => calls.url + type + domElement.input.value;



//.reduce //Example: limit the word.length to 12/
// acc = accumulator, cur = current
// acc: 0 / acc + cur.length = 3 / newTitle = ['foo']
// acc: 5 / acc + cur.length = 6 / newTitle = ['foo','bar']
// acc: 9 / acc + cur.length = 10 / newTitle = ['foo', 'bar', 'what']
// acc: 10/ stops / .../
const limitWord = (status, limit = 18) => {
    const newStatus = [];
    if (status.length > limit) {
        status.split(' ').reduce((arr, cur) => {
            if (arr + cur.length <= limit) {
                newStatus.push(cur);
            }
            return arr + cur.length;
        }, 0);
        return `${newStatus.join(' ')} ...`;
    }
    return status;
}


const logic = {
    userUndefined() {
         alert("No such channels, sorry!");
         domElement.input.value = "";
    },
    createElement(display, logo, followerNumber, stream, status) {
        //create a tr element to be appended.
        let tr = document.createElement("tr");

        //creates a td for the name;
        let tdDisplay = document.createElement("td");
        let tdDisplayNode = document.createTextNode(display);
        let h3 = document.createElement("h3");
        h3.appendChild(tdDisplayNode);
        tdDisplay.appendChild(h3);

        //create td for logo;
        let tdImage = document.createElement("td");
        let image = document.createElement("img");
        image.src = logo;
        tdImage.appendChild(image);

        //create a p tag for number of followers
        let follower = document.createElement("p");
        let followerNode = document.createTextNode("Followers: " + followerNumber);
        follower.appendChild(followerNode);
        //append it to the image//
        tdImage.appendChild(follower);


        //check if stream is online or not.
        let tdChannel = document.createElement("td");
        let pStatus = document.createElement("p");
        let span = document.createElement("span");
        if (stream === null) {
            pStatus.innerHTML = "Offline";
            pStatus.classList.add("offlineText");
            tr.classList.add("offline");
        } else {
            pStatus.innerHTML = limitWord(status);
            tr.classList.add("online");
        }
        tdChannel.appendChild(pStatus);

        //Append everything.
        tr.appendChild(tdImage);
        tr.appendChild(tdDisplay);
        tr.appendChild(tdChannel);
        return domElement.channels.appendChild(tr);
    }
}

const callUser = () => {
    $.when(
        $.getJSON(apiCalls(calls.channels)),
        $.getJSON(apiCalls(calls.streams))
    ).done(function(data, data1){
        if (data[0].display_name === undefined) {
            logic.userUndefined();
        } else {
            logic.createElement(data[0].display_name, data[0].logo, data[0].followers, data1[0].stream, data[0].status);
            domElement.input.value = "";
        }
    })
}

domElement.button.addEventListener('click', callUser);
//EventListeners for offline,online,all buttons.
let allButtons = {
    all: document.querySelector('#all'),
    onlineButton: document.querySelector("#online"),
    offlineButton: document.querySelector('#offline')
}
  
  
  
allButtons.onlineButton.addEventListener("click", function() {
    for (let i = 0; i < domElement.channels.children.length; i++) {
        if (domElement.channels.children[i].classList.contains("offline")){
          domElement.channels.children[i].classList.add("displayNone");
        } else {
          domElement.channels.children[i].classList.remove("displayNone");
        }
      }
})
  
allButtons.offlineButton.addEventListener("click", function() {
    for (let i = 0; i < domElement.channels.children.length; i++) {
        if (domElement.channels.children[i].classList.contains("online")){
            domElement.channels.children[i].classList.add("displayNone");
        } else {
            domElement.channels.children[i].classList.remove("displayNone");
        }
    } 
})
  
allButtons.all.addEventListener("click", function() {
    for (let i = 0; i < domElement.channels.children.length; i++) {
        domElement.channels.children[i].classList.remove("displayNone");
    }
})
  
