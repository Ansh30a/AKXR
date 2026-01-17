function addTwo(num) {
    return num + 2;
}
// console.log(addTwo(5));
function getUpper(val) {
    return val.toUpperCase();
}
// console.log(getUpper('anshuman'));
function signUpUser(name, email, password, isPaid) {
    console.log(name);
    return { name: name, email: email, isPaid: isPaid };
}
// console.log(signUpUser('Ansh', 'abcd@efgh.com', '1234', true));
var loginUser = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
    return { name: name, email: email, isPaid: isPaid };
};
// console.log(loginUser('Ansh', 'anshu@anshu', true));
// --------------- RETURN TYPE ---------------
function addTwoNum(num) {
    // return 'hello';
    return num + 2;
}
// function getValue(myVal: number) {
//     if (myVal > 5) return true; ------------------------- SPECIAL CASE with 2 return types
//     return '200';
// }
var getHello = function (s) {
    return s;
};
// const heroes = ['thor', 'ironaman', 'spiderman'];
var heroes = [1, 2, 3];
var hero = heroes.map(function (hero) {
    return "Hero's name is ".concat(hero);
});
// console.log(hero);
function consoleError(err) {
    console.log(err);
}
function handleError(err) {
    throw new Error(err);
}
console.log(handleError('404'));
