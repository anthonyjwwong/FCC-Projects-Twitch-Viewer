"use strict"

let input = document.querySelector('.channels_input');
let button = document.querySelector('.channels_button');
let channels= document.querySelector('.channel_body');

//The url that we're calling
let calls = {
  url: "https://wind-bow.glitch.me/twitch-api/",
  channels: "channels/",
  streams: "streams/"
}

//return the full url
function apiCalls(type) {
  return calls.url + type + input.value;
}

//Creating everything when input is searched.
let logic = {

  createEle(display, logo, follower, stream, status) {
    //if name isn't registered
    if (display === undefined) {
      alert("No such channels, sorry!")
    } else {
      //else, create TR element
      let tr = document.createElement("tr");

      //create a td for the Name nad append
      let displayTd = document.createElement("td");
      let displayNode = document.createTextNode(display);
      let h3 = document.createElement("h3");
      h3.appendChild(displayNode);
      displayTd.appendChild(h3);

      //create TD for logo and append
      let imageTd = document.createElement("td");
      let image = document.createElement("img");
      image.src = logo;
      imageTd.appendChild(image);

      //create a p for number of followers and append to image TD
      let p = document.createElement("p");
      let followerNode = document.createTextNode("Followers: " + follower);
      p.appendChild(followerNode);
      imageTd.appendChild(p);

      //check if stream is online or not.
      let channelTd = document.createElement("td");
      let statusP = document.createElement("p");
      if (stream === null) {
        statusP.innerHTML = "Offline"
        tr.classList.add("offline");
      } else {
        statusP.innerHTML = status;
        tr.classList.add("online");
      }
      channelTd.appendChild(statusP);

      //append everything to body of table
      tr.appendChild(imageTd);
      tr.appendChild(displayTd);
      tr.appendChild(channelTd);
      channels.appendChild(tr);

    }
  }
}




//when button is clicked
button.addEventListener('click', function(){
  //calls the urls, and get all the data.
  $.when(
    $.getJSON(apiCalls(calls.channels)),
    $.getJSON(apiCalls(calls.streams))
  ).done(function(data,data1) {
    //arguements are the data that we need for our function.
    //Name, Logo, Followers, Stream(online/offline), Status
    logic.createEle(data[0].display_name, data[0].logo, data[0].followers, data1[0].stream, data[0].status);
   })
   input.value ="";
})

//For Hard Code // FCC and ESL_SC2;
$.when(
  $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/freecodecamp"),
  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/freecodecamp")
).done(function(data, data1) {
  let fccLogo = document.querySelector('.fccLogo');
  let fccName = document.querySelector('.fccName');
  let fccStatus = document.querySelector('.fccStatus');
  let fcc = document.querySelector('.freecodecamp');
  let h3 = document.createElement("h3");
  let node = document.createTextNode(data[0].display_name);
  h3.appendChild(node);
  fccName.appendChild(h3);

  fccLogo.innerHTML = fccLogo.innerHTML = "<img class='photoRz' src='" + data[0].logo +"'>" + "<br><p>Followers: "
  + data[0].followers + "</p>";
  if (data1[0].stream === null) {
    fccStatus.innerHTML = "Offline";
    fcc.classList.add("offline");
  } else {
    fccStatus.innerHTML = data[0].status;
    fcc.classList.add("online");
  }
})

$.when(
  $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/esl_sc2"),
  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/esl_sc2")
).done(function(data, data1) {
  let eslLogo = document.querySelector('.eslLogo');
  let eslName = document.querySelector('.eslName');
  let eslStatus = document.querySelector('.eslStatus');
  let esl = document.querySelector('.esl_sc2');
  let h3 = document.createElement("h3");
  let node = document.createTextNode(data[0].display_name);
  h3.appendChild(node);
  eslName.appendChild(h3);

  eslLogo.innerHTML = eslLogo.innerHTML = "<img class='photoRz' src='" + data[0].logo +"'>" + "<br><p>Followers: "
  + data[0].followers + "</p>";
  if (data1[0].stream === null) {
    eslStatus.innerHTML = "Offline";
    esl.classList.add("offline");
  } else {
    eslStatus.innerHTML = data[0].status;
    esl.classList.add("online");
  }
})


//EventListeners for offline,online,all buttons.
let allButtons = {
  all: document.querySelector('#all'),
  onlineButton: document.querySelector("#online"),
  offlineButton: document.querySelector('#offline')
}



allButtons.onlineButton.addEventListener("click", function() {
  for (let i = 0; i < channels.children.length; i++) {
    if (channels.children[i].classList.contains("offline")){
      channels.children[i].classList.add("displayNone");
    } else {
      channels.children[i].classList.remove("displayNone");
    }
  }

})

allButtons.offlineButton.addEventListener("click", function() {
  for (let i = 0; i < channels.children.length; i++) {
    if (channels.children[i].classList.contains("online")){
      channels.children[i].classList.add("displayNone");
    } else {
      channels.children[i].classList.remove("displayNone");
    }
  }

})

allButtons.all.addEventListener("click", function() {
  for (let i = 0; i < channels.children.length; i++) {
    channels.children[i].classList.remove("displayNone");
 }
})
