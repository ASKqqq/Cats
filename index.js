const $wrapper = document.querySelector('[data-wrapper]')
const $createForm = document.forms.createForm
// const $openModalAddCat = document.querySelector('[data-openModal="addCat"]')
const $openModalForEveryone = document.querySelector('[data-openModal="forEveryone"]')
const $modal = document.querySelector('[data-modal]')
// const $modalContent = document.querySelector('[data-modalContent]')
const $btnClose = document.querySelector('[data-btnClose]')

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
  })
    .then((res) => {
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

/* отображение информации в модальном окне о коте */

$wrapper.addEventListener('click', (event) => {
  if (event.target.closest('[data-cat-id]')) {
    const $catWr = event.target.closest('[data-cat-id]')
    const { catId } = $catWr.dataset

    fetch(`https://cats.petiteweb.dev/api/single/ASKqqq/show/${catId}`)
      .then((res) => res.json())
      .then((res) => $wrapper.insertAdjacentHTML(
        'afterbegin',
        `
        <div data-modalView class="modal">
    <div data-modalContent-view class="modal__content">
    <form data-form name="createForm">
    <button data-btnClose type="button" class="btn-close" aria-label="Close"></button>
    <div class="mb-3">
    <img src="${res.image}" class="card-img" alt="${res.name}">
    </div>
    <div class="mb-3">
      <label for="id" class="form-label">ID</label>
      <input data-id = "${res.id}" type="text" class="form-control" id="id" placeholder="${res.id}">
      </div>
      <div class="mb-3">
      <label for="name" class="form-label">Name Cat</label>
      <input type="text" name="name" placeholder="${res.name}" id="name" class="form-control">
      </div>
      <div class="mb-3">
      <label for="rate" class="form-label">Rate</label>
      <input type="number" name="rate" placeholder="${res.rate}" id="rate" class="form-control">
      </div>
      <div class="mb-3">
      <label for="age" class="form-label">Age</label>
      <input type="number" name="age" placeholder="${res.age}" id="age" class="form-control">
      </div>
      <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <input type="text" name="description" placeholder="${res.description}" id="description" class="form-control">
    </div>
    <div class="mb-3 form-check">
    <input class="form-check-input fs-6" type="checkbox" value="${res.favorite}" id="cat-fav-update" name="cat-fav-update">
    <label class="form-check-label badge bg-primary text-wrap fs-6" for="cat-fav-update">Favorite</label>
    </div>
    <button data-action="Change" type="button" class="btn btn-primary">Change</button>
<button data-action="Delete" type="button" class="btn btn-danger">Delete</button>
  </form>
  </div>
  </div>        
`,
      ))
    // if (document.querySelector('#cat-fav-update').value === 'true') {
    //   document.querySelector('#cat-fav-update').checked = true
    // }
    // document.querySelector('#cat-fav-update').addEventListener('click', () => {
    //   if (document.querySelector('#cat-fav-update').checked) {
    //     document.querySelector('#cat-fav-update').value = 'true'
    //   }
    //   if (!document.querySelector('#cat-fav-update').checked) {
    //     document.querySelector('#cat-fav-update').value = 'false'
    //   }
    // })
  }
})
//   }
// })

/* Закрытие модалки добавления кота */

$openModalForEveryone.addEventListener('click', (ev) => {
  const $modalView = document.querySelector('[data-modalView]')
  const $btnCloseView = document.querySelector('[data-btnClose]')
  if (ev.target === $btnCloseView) {
    $modalView.classList.add('hidden')
  }
  if (ev.target === $modalView) {
    $modalView.classList.add('hidden')
  }
})

/* Закрытие модалки добавления кота по ESC */

document.addEventListener('keydown', (e) => {
  const $modalView = document.querySelector('[data-modalView]')
  if (e.key === 'Escape') {
    $modalView.classList.add('hidden')
  //   // $modalView.removeEventListener('click', clickModalClose)
  //   // $createForm.removeEventListener('submit', creatCatHandler)
  }
})

/* Удаление кота */

$wrapper.addEventListener('click', (ev) => {
  const $btnDelete = document.querySelector('[data-action="Delete"]')
  if (ev.target === $btnDelete) {
    const $catWr = document.querySelector('[data-id]')
    const $catIdDel = $catWr.dataset.id
    const $catID = document.querySelector('[data-cat-id]')
    fetch(`https://cats.petiteweb.dev/api/single/ASKqqq/delete/${$catIdDel}`, {
      method: 'DELETE',
    // eslint-disable-next-line consistent-return
    }).then((res) => {
      if (res.status === 200) {
        return $catID.remove()
      }
      // eslint-disable-next-line no-alert
      alert(`Удаление кота с id = ${$catIdDel} не удалось`)
    })
  }
})

/* Изменение кота */
// $wrapper.addEventListener('click', (ev) => {
//   // ev.preventDefault()
//   const $formCatCh = document.querySelector('[data-form]')
//   // const $catIdCh = $catWr.dataset.id
//   let formDataCh = new FormData($formCatCh)
//       console.log(formDataCh);
//   // formDataObject = {
//   //   ...formDataObject,
//   //   id: +formDataObject.id,
//   //   rate: +formDataObject.rate,
//   //   age: +formDataObject.age,
//   //   favorite: !!formDataObject.favorite,
//   // }

//   const $btnChange = document.querySelector('[data-action="Change"]')
//   if (ev.target === $btnChange) {
//     const $catWr = document.querySelector('[data-id]')
//     const $catIdCh = $catWr.dataset.id
//     const $catID = document.querySelector('[data-cat-id]')
//     const $catCh = document.querySelector('[data-modalContent-view]')
//     // fetch(`https://cats.petiteweb.dev/api/single/ASKqqq/update/${$catIdCh}`, {
//     //   method: 'PUT',
//     // }).then((res) => {
//     //   if (res.status === 200) {
//     //     $catID.insertAdjacentHTML('afterbegin', getCat(catData))
//     //   }
//     //   alert(`Изменение кота с id = ${$catIdCh} не удалось`)
//     // })
//   }
// })
