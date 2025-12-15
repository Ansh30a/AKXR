// Single Element Selectors
// const form = document.getElementById('my-form')
// console.log(document.querySelector('.container'))
// console.log(document.querySelector('h1'))



// Multiple Element Selectors           
// console.log(document.querySelectorAll('.item'));
// console.log(document.getElementsByClassName('item'));
// console.log(document.getElementsByTagName('li'));

// const items = document.querySelectorAll('.item')
// items.forEach((item) => console.log(item))

// const ul = document.querySelector('.items')
// ul.remove()
// ul.lastElementChild.remove()
// ul.firstElementChild.textContent = 'Hello'
// ul.children[1].innerText = 'Ansh'
// ul. lastElementChild.innerHTML = '<h1>Hello World</h1>'

// const btn = document.querySelector('.btn')
// btn.style.background = 'red'


// const btn = document.querySelector('.btn')

// btn.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log(e);
//     document.querySelector('#my-form').style.background = '#ccc'
//     document.querySelector('body').classList.add('bg-dark')
// })

const myForm = document.querySelector('#my-form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const msg = document.querySelector('.msg')
const userList = document.querySelector('#users')

myForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault()
    console.log(nameInput.value);  
}