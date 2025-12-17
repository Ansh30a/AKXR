// --------------------------------LESSON: 03 ---------------------------------------------->

// var titles = document.getElementsByClassName('title')

// titles.forEach(function(item) {
//     console.log(item);
// });

// console.log(Array.isArray(titles));

// console.log(Array.isArray(Array.from(titles)));

// Array.from(titles).forEach((item) => {
//     console.log(item);
// });



// --------------------------------LESSON: 04 ---------------------------------------------->

// $('#wrapper') --------- JQuery ------------

// const wrap = document.querySelector('#wrapper')
// console.log(wrap)

// const bookList = document.querySelector('#book-list li:nth-child(2) .name')
// console.log(bookList);

// const span = document.querySelector('#book-list li .name')
// console.log(span);

// const span = document.querySelectorAll ('#book-list li .name')
// console.log(span);
// Array.from(span).forEach((item) => console.log(item))



// --------------------------------LESSON: 05 ---------------------------------------------->

// const books = document.querySelectorAll('#book-list li .name')
// Array.from(books).forEach((book) => book.textContent += ' (Book Title)')

// const bookList = document.querySelector('#book-list')
// bookList.innerHTML = '<h1> Books </h1>'
// bookList.innerHTML += '<p>HTML</p>'



// --------------------------------LESSON: 05 ---------------------------------------------->

// const banner = document.querySelector('#page-banner')
// console.log('#page-banner node type is:', banner.nodeType)
// console.log('#page-banner node type is:', banner.nodeName)
// console.log('#page-banner node type is:', banner.hasChildNodes())

// const clonedBanner = banner.cloneNode(true)
// console.log(clonedBanner)



// --------------------------------LESSON: 10 ---------------------------------------------->

const list = document.querySelector('#book-list ul')

// DELETE Books
list.addEventListener('click', (e) => {
    if (e.target.className == 'delete') {
        const li = e.target.parentElement
        list.removeChild(li)
    }
})

// ADD Books
const addForm = document.forms['add-book']
addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = addForm.querySelector('input[type="text"]').value
    // console.log(value)
    // list.appendChild(value) -----------Wrong
    // Array.from(list).forEach((li) => li.textContent += value) ---------Wrong
    // ----------- Creating new Element to CORRECTLY add a book ---------------
    const li = document.createElement('li')
    const bookName = document.createElement('span') 
    const deleteButton = document.createElement('span')

    // ----------- Appending to DOM ------------------
    li.appendChild(bookName)
    li.appendChild(deleteButton)
    list.appendChild(li)

    // ----------- Adding actual content to the newly created tags --------------
    deleteButton.textContent = 'delete'
    bookName.textContent = value

    // ------- adding classes to the new tags ------
    bookName.classList.add('name')
    deleteButton.classList.add('delete')
})

// HIDING books with checkbox
const hideBox = document.querySelector('#hide')
hideBox.addEventListener('change', (e) => {
    if (hideBox.checked) {
        list.style.display = 'none'
    }
    else {
        list.style.display = 'initial'
    }
})

// SEARCHING for Books
const searchBar = document.forms['search-books'].querySelector('input')
searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const books = list.getElementsByTagName('li')
    Array.from(books).forEach((book) => {
        const title = book.firstElementChild.textContent
        if (title.toLowerCase().indexOf(searchTerm) != -1) {
            book.style.display = 'block'
        } 
        else {
            book.style.display = 'none'
        }
    })
})

// TABBED Content
const tabs = document.querySelector('.tabs')
const panels = document.querySelectorAll('.panel')
tabs.addEventListener('click', (e) => {
    if(e.target.tagName == 'LI') {
        const targetPanel = document.querySelector(e.target.dataset.target)
        panels.forEach((panel) => {
            if (panel == targetPanel) {
                panel.classList.add('active')
            }
            else {
                panel.classList.remove('active')
            }
        })
    }
})