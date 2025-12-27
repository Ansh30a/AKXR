// const blogs = [
//     { title: 'Hello', likes: 10 },
//     { title: 'Bye', likes: 5 }
// ]
// console.log(blogs);

let user = {
    name: 'ansh',
    age: 30,
    email: 'ansh@ansh.com',
    location: 'Delhi',

    // blogs: ['hello', 'bye'],

    blogs: [
        { title: 'Hello', likes: 10 },
        { title: 'Bye', likes: 5 }
    ],

    logIn: (() => {
        console.log(`${user.name} logged in`)        
    }),

    logOut: (() => {
        console.log(`${user.name} logged out`)        
    }),

    logBlogs: (() => {
        console.log(user.blogs)
    }),

    logBlog() {
        console.log(this.blogs[1])        
    },

    newLogBlogs: function() {
        console.log(this.blogs)        
    },

    logEachBlog: function() {
        this.blogs.forEach((blog) => {
            console.log(blog.title, blog.likes)            
        })
    }
}

// console.log(user)

// console.log(user.name)

// user.age = 21

// console.log(user.age)

// console.log(user['name']);

// const key = user.name

// console.log(key);

// const key1 = 'name'

// console.log(user[key1]);

// console.log(typeof user);

// user.logIn()

// user.logOut()

// user.logBlogs()

// user.logBlog()

// user.newLogBlogs()

// user.logEachBlog()


// ------------------- MATH -------------------------

// console.log(Math)

// console.log(Math)

// console.log(Math.PI)

// console.log(Math.E)

// console.log(Math.floor(7.7))

// console.log(Math.ceil(7.2))

// console.log(Math.floor(7.7))

// console.log(Math.trunc(7.7))

// const random = Math.random()

// console.log(random)

// console.log(Math.round(random * 6) + 1)


// ---------------- Primitive vs Reference ---------------
// Primitive
let score1 = 50
let score2 = score1

// console.log(`score1 is ${score1} and score2 is ${score2}`)

score1 = 100

// console.log(`score1 is ${score1} and score2 is ${score2}`)

// Reference
let user1 = {
    name: 'ansh',
    age: 21
}

let user2 = user1

console.log(`name of user 1 is ${user1.name} and name of user 2 is ${user2.name}`)

user1.name = 'anshu'

console.log(`name of user 1 is ${user1.name} and name of user 2 is ${user2.name}`)
