type User = {
    name: string;
    email: string;
    isActive: boolean;
}

function createUser(user: User): User {
    return user;
    // return user.name;
}

console.log(createUser({ name: 'ansh', email: '', isActive: true }));