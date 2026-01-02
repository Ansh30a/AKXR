function a() {
    var b = 1
    console.log(b)
    c()
    function c() {
        console.log(b)
    }
}
var b = 10

a()

console.log(b)