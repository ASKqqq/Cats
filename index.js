const $wrapper = document.querySelector('[data-wrapper]')
const $createForm = document.forms.createForm
const $openModalAddCat = document.querySelector('[data-openModal="addCat"]')
const $openModalForEveryone = document.querySelector('[data-openModal="forEveryone"]')
const $modal = document.querySelector('[data-modal]')
const $modalContent = document.querySelector('[data-modalContent]')
const $btnClose = document.querySelector('[data-btnClose]')

// console.log($modal, $modalContent)

const getCat = (cat) => `
<div data-cat-id="${cat.id}" class="card" style="width: 18rem;">
  <img src="${cat.image}" class="card-img-top" alt="${cat.name}">
  <div class="card-body">
    <h5 class="card-title">${cat.name}</h5>
    <p class="card-text">${cat.description}.</p>
  </div>
</div>
`
/* Отобразить на странице информацию обо всех котиках, которые есть в Базе данных */

fetch('https://cats.petiteweb.dev/api/single/ASKqqq/show/')
  .then((res) => res.json())
  .then((data) => $wrapper.insertAdjacentHTML('afterbegin', data.map((cat) => getCat(cat)).join('')))

/* Обработчик на форму добавления кота */

const creatCatHandler = $createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let formDataObject = Object.fromEntries(new FormData(e.target).entries())

  formDataObject = {
    ...formDataObject,
    id: +formDataObject.id,
    rate: +formDataObject.rate,
    age: +formDataObject.age,
    favorite: !!formDataObject.favorite,
  }

  // ВАЛИДАЦИЯ

  fetch('https://cats.petiteweb.dev/api/single/ASKqqq/add/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObject),
  }).then((res) => {
    if (res.status === 200) {
      return $wrapper.insertAdjacentHTML(
        'afterbegin',
        getCat(formDataObject),
      )
    }
    throw Error('Error creating cat')
  }).catch(alert)
})

/* Открытие/закрытие модалки для добавления кота */

const clickModalClose = (ev) => {
  if (ev.target === $modal) {
    $modal.classList.add('hidden')
    $modal.removeEventListener('click', clickModalClose)
    $createForm.removeEventListener('submit', creatCatHandler)
  }
  if (ev.target === $btnClose) {
    $modal.classList.add('hidden')
    $modal.removeEventListener('click', clickModalClose)
    $createForm.removeEventListener('submit', creatCatHandler)
  }
}

const openModalHandler = (e) => {
  const targetModalName = e.target.dataset.openmodal

  if (targetModalName === 'addCat') {
    $modal.classList.remove('hidden')
    $modal.addEventListener('click', clickModalClose)
    $createForm.addEventListener('submit', creatCatHandler)
  }
}

$openModalForEveryone.addEventListener('click', openModalHandler)

/* Закрытие модалки добавления кота по ESC */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $modal.classList.add('hidden')
    $modal.removeEventListener('click', clickModalClose)
    $createForm.removeEventListener('submit', creatCatHandler)
  }
})
