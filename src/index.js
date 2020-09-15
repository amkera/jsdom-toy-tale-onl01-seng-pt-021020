const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
<<<<<<< HEAD
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () =>{
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      //take this toys array of objects, make it into HTML, and add to the DOM
      let toysHTML = toys.map(function(toy){
        return `
          <div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button data-id="${toy.id}"class="like-btn">Like <3</button>
          </div>
        `
      })
      document.querySelector("#toy-collection").innerHTML = toysHTML.join("")
      //use =+ toysHTML if the div had something in it already
    })
=======


// challenge 1: fetch all the toys
function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())

}

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  });
});

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  //add src attribute to the toy's image
  img.setAttribute('class', 'toy-avatar')
  //add class attribute called toy-avatar to the image

  //The setAttribute() method adds the specified attribute to an element,
  //and gives it the specified value.

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
>>>>>>> 691e52de000acda8da9be0313436146c234e8dcc

toyForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const toyName = e.target.name.value
  const toyImage = e.target.image.value
  //now we have the data we can send to the database

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 100
    })
  })
  .then( r => r.json())
  //convert new JSON toy object to HTML in order to add to the DOM
  .then( newToy => {

    let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}"class="like-btn">Like <3</button>
      </div>
    `
    toyCollection.innerHTML += newToyHTML
    console.log(e.target.reset())


    })
})


toyCollection.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    //listen only if a button with a classname of like-btn is clicked
    let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + " likes"
    //this updated the DOM

    //this updates the db
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
      //e.target is the FORM. the form has a data-id attached to it. this ensures the correct URL


  }
})


  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // toyForm.addEventListener('submit', event => {
      //   event.preventDefault()
      //   postToy(event.target)
      // })
    } else {
      toyForm.style.display = 'none'
    }
  })
});
