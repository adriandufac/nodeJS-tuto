const p = Promise.resolve({ id: 1 }); // using PRomise API top simulate already resolved promise (usefull for unit test)
p.then((result) => console.log(result));
const p2 = Promise.reject(new Error("reason for rejections...")); // using PRomise API top simulate rejectedpromise (usefull for unit test)
p2.catch((err) => console.log(err));

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async opperation 1...");
    resolve(1);
    //reject(new Error("something failed...."));
  }, 2000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async opperation 2...");
    resolve(2);
  }, 2000);
});

// TO DO SOMETHING WHEN MULTIPLE PROMISES ARE RESOLVED :
Promise.all([p3, p4])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));

// RESULT IS VALUE OF THE FIRST PROMISE TO COMPLETE  (if 2 ways to get the same thing ??):
Promise.race([p3, p4])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));
