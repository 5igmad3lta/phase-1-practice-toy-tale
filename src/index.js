let addToy = false;
const inputName = document.querySelector('input[name="name"]');
const imgUrl = document.querySelector('input[name="image"]');
const toyCollection = document.getElementById('toy-collection');
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', getAllToys);
function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderToyCollection(toy)))
}


function renderToyCollection(toy){
  let toyObj = document.createElement('div')
  toyObj.className = 'card'
  toyObj.innerHTML = `
  <h2>${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}">
  <p>${toy.likes} Likes</p>
  <button id="${toy.id}" class="like-btn">Like ❤️</button>` 

  toyObj.querySelector('button').addEventListener('click', () => {
    toy.likes+= 1
    toyObj.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  })

  toyCollection.appendChild(toyObj)
}



function addToCollection(toyObj) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }


function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: inputName.value,
    image: imgUrl.value,
    likes: 0
  }
  console.log(toyObj)
  renderToyCollection(toyObj)
  addToCollection(toyObj)
  this.reset();
  }


function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}


document.querySelector('form.add-toy-form').addEventListener('submit', handleSubmit)