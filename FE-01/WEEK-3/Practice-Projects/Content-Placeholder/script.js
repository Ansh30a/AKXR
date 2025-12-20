const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_texts = document.querySelectorAll('.animated-bg-text')

setTimeout(() => {
    getData()
}, 1000);

function getData() {
    header.innerHTML = '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww" alt="">'

    title.innerHTML = 'Lorem ipsum dolor sit amet.'

    excerpt.innerHTML = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, nisi.'

    profile_img.innerHTML = '<img src="https://randomuser.me/api/portraits/men/25.jpg" alt="">'

    name.innerHTML = 'John'

    date.innerHTML = '8 October 2025'

    animated_bgs.forEach(bg => bg.classList.remove('animated-bg'))

    animated_bg_texts.forEach(bg => bg.classList.remove('animated-bg-text'))

}