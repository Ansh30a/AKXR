const posts = [
    { title: 'postOne', body: 'this is the post 1' },
    { title: 'postTwo', body: 'this is the post 2' },
]

// -------------------------- CALLBACK --------------------------------

function getPost() {
    setTimeout(() => {
        let output = ''
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`
        })
        document.body.innerHTML = output
    }, 1000)
}

function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post)
        callback()
    }, 2000)
}

// getPost() // --------------- making it a callback

// createPost({ title: 'postThree', body: 'this is the post 3' }, getPost)



// -------------------------- Promise --------------------------------

function createPostNew(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post)
            const error = false
            if (!error) {
                resolve()
            } else {
                reject(`Error: Something went wrong`)
            }
        }, 2000)
    })    
}

// createPostNew({ title: 'postFour', body: 'this is post 4' })
//     .then(getPost)
//     .catch(err => console.log(err))

// =============== Multiple Promises =================

// const promise1 = Promise.resolve('World')

// const promise2 = 10

// const promise3 = new Promise((res, rej) => {
//     setTimeout(res, 2000, `hello`);
// })

// const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())

// Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
//     console.log(values)    
// })



// -------------------------- Async Await --------------------------------
async function init() {
    await createPostNew({ title: 'postFive', body: 'this is post 5' })
    getPost()
}

// init()


// ==================== Async with fetch ===================
async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const jsonData = await res.json()
    console.log(jsonData)       
}

fetchUsers()