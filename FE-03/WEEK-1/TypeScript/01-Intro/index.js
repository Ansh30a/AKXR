// class User {
//     email: string       // ---- by default it is public
//     name: string
//     private readonly city: string = 'Jaipur'
//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name
//     }
// };
// const ansh = new User("a@a.com", "ansh");
// ansh.city       // ---- not accessible outside the class as it is private
var User = /** @class */ (function () {
    function User(email, name, userId) {
        this.email = email;
        this.name = name;
        this.userId = userId;
        this.city = 'Jaipur';
        this.email = email;
        this.name = name;
    }
    return User;
}());
;
