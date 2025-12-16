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

const banner = document.querySelector('#page-banner')
// console.log('#page-banner node type is:', banner.nodeType)
// console.log('#page-banner node type is:', banner.nodeName)
// console.log('#page-banner node type is:', banner.hasChildNodes())

const clonedBanner = banner.cloneNode(true)
console.log(clonedBanner)
