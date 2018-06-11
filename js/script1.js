"use strict"


let input = document.querySelector('.channels_input');
let button = document.querySelector('.channels_button');
let channels= document.querySelector('.channel_body');


let calls = {
  url: "https://wind-bow.glitch.me/twitch-api/",
  channels: "channels/",
  streams: "streams/"
}

function apiCalls(type) {
  return calls.url + type + input.value;
}

let buttons = {

  online(ele) {
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].classList.contains("offline")) {
        ele[i].classList.add("displayNone");
      } else {
        ele[i].classList.remove("displayNone");
      }
    }
  },
  offline(ele) {
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].classList.contains("online")) {
        ele[i].classList.add("displayNone");
      } else {
        ele[i].classList.remove("displayNone");
      }
    }
  },
  allButtons(ele) {
    for (let i =0; i < ele.length; i++){
      ele[i].classList.remove("displayNone");
    }
  }
}



let logic = {


  createEle(display, logo, follower, stream, status) {
    if (display === undefined) {
      alert("No such channels, sorry!")
    } else {
      let tr = document.createElement("tr");

      let displayTd = document.createElement("td");
      let displayNode = document.createTextNode(display);
      let h3 = document.createElement("h3");
      h3.appendChild(displayNode);
      displayTd.appendChild(h3);

      let imageTd = document.createElement("td");
      let image = document.createElement("img");
      image.src = logo;
      imageTd.appendChild(image);

      let p = document.createElement("p");
      let followerNode = document.createTextNode("Followers: " + follower);
      p.appendChild(followerNode);
      imageTd.appendChild(p);

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


      tr.appendChild(imageTd);

      tr.appendChild(displayTd);
      tr.appendChild(channelTd);
      channels.appendChild(tr);

    }
  }
}





button.addEventListener('click', function(){
  $.when(
    $.getJSON(apiCalls(calls.channels)),
    $.getJSON(apiCalls(calls.streams))
  ).done(function(data,data1) {
    logic.createEle(data[0].display_name, data[0].logo, data[0].followers, data1[0].stream, data[0].status);
   })
   input.value ="";
})

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
