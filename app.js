const os = require ('os');
function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Adrian');
var total = os.totalmem();
var free = os.freemem();
console.log (`total memory : ${total}  free memory : ${free}`);