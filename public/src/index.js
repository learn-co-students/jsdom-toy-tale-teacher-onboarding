const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyUrl = 'http://localhost:3000/toys';
const toyCollectionDiv = document.getElementById('toy-collection');
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      postToy(event.target);
    });
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener('DOMContentLoaded', e => {
  console.log("DOM loaded!");
  fetchToys();
});


function postToy(toyData) {
  const formData = {
    "name": toyData.name.value,
    "image": toyData.image.value,
    "likes": 0
  };

  const configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(toyUrl, configObj)
    .then(resp => resp.json())
    .then(json => {
      renderToy(json);
    });
};

function fetchToys() {
  fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => {
      // console.log(json);
      json.forEach( object => {
        renderToy(object);
      });
    });
}

function renderToy(object) {
  // console.log(object);
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', "card");
  const nameHead = document.createElement('h2');
  nameHead.innerText = object["name"];
  const imgEl = document.createElement('img');
  imgEl.setAttribute('src', object["image"]);
  imgEl.setAttribute('class', "toy-avatar");
  const likesPar = document.createElement('p');
  likesPar.innerText = `${object["likes"]} likes`;
  const buttonEl = document.createElement('btn');
  buttonEl.setAttribute('class', "like-btn");
  buttonEl.setAttribute('id', object["id"]);
  buttonEl.innerText = "Like <3";
  buttonEl.addEventListener('click', incrementLikes);
  cardDiv.appendChild(nameHead);
  cardDiv.appendChild(imgEl);
  cardDiv.appendChild(likesPar);
  cardDiv.appendChild(buttonEl);
  toyCollectionDiv.appendChild(cardDiv);
};

function incrementLikes(event) {
  event.preventDefault();
  let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(resp => RTCSessionDescription.json())
    .then((json => {
      event.target.previousElementSibling.innerText = `${newLikes} likes`;
    }))
};