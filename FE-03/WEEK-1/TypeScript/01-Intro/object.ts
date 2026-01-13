const User = {
    name: 'Ansh',
    email: 'ansh@ansh.com',
    isActive: true
}

function createUser(user: { name: string; isPaid: boolean }) {
    return { name: user.name, isPaid: user.isPaid};
}

// console.log(createUser({ name: 'anshu', isPaid: false }));

function createCourse(course: { name: string; price: number }): { name: string; price: number } {
    return { name: course.name, price: course.price };
}

// console.log(createCourse({ name: 'DSA', price: 5999.99}));
