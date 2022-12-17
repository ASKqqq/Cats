const $wrapper = document.querySelector('[data-wrapper]')

const getCat = (cat) => `
<div class="card" style="width: 18rem;">
  <img src="${cat.image}" class="card-img-top" alt="${cat.name}">
  <div class="card-body">
    <h5 class="card-title">${cat.name}</h5>
    <p class="card-text">${cat.description}.</p>
    
  </div>
</div>
`

fetch('https://cats.petiteweb.dev/api/single/ASKqqq/show/')
  .then((res) => res.json())
  .then((data) => $wrapper.insertAdjacentHTML('afterbegin', data.map((cat) => getCat(cat)).join('')))
