// --------------------------- PRIVATE / PUBLIC ---------------------------

// class User {
//     email: string;       // ---- by default it is public
//     name: string;
//     private readonly city: string = 'Jaipur'
//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name
//     };
// };

// const ansh = new User("a@a.com", "ansh");
// ansh.city       // ---- not accessible outside the class as it is private

// --------------------------- GETTER / SETTER ---------------------------

class User {
    protected _courseCount = 1;

    readonly city: string = 'Jaipur';
    constructor(
        public email: string, 
        public name: string,
        private userId: string
    ) {

    };

    private deleteToken() {
        console.log(`Token Deleted`);
    };

    get getAppleEmail(): string {
        return `apple ${this.email}`;
    };

    get courseCount(): number {
        return this._courseCount;
    };

    set courseCount(courseNumber) {
        if (courseNumber <= 1) {
            throw new Error("Course count should be more than 1.");
        }
        this._courseCount = courseNumber;
    };

};

const ansh = new User("a@a.com", "ansh", "1");

// ansh.deleteToken        // ---- can't access private method outside the class



// --------------------------- PROTECTED ---------------------------

class subUser extends User {        // ---- can't inherit private attributes and methods
    isFamily: boolean = true;
    changeCourseCount() {
        this._courseCount = 4;
    };
};