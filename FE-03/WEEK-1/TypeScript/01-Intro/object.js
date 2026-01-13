var User = {
    name: 'Ansh',
    email: 'ansh@ansh.com',
    isActive: true
};
function createUser(user) {
    return { name: user.name, isPaid: user.isPaid };
}
// console.log(createUser({ name: 'anshu', isPaid: false }));
function createCourse(course) {
    return { name: course.name, price: course.price };
}
console.log(createCourse({ name: 'DSA', price: 5999.99 }));
