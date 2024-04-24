// 3 ways to deal with asyc :
// Callbacks
// Promises
// Async/await

//*****************************            CALLBACKS                       *****************************// :
/* console.log("Before");
getUser(1, (user) => {
  console.log(user);
  getRepositories(user.gitHubName, (repo) => {
    console.log(repo);
    getAllComits(repo, (comits) => {
      console.log(comits);
    });
  });
});
console.log("After");
// Create a nested structure, refered as callback HELL , not good
// SOLUTION : NAMED FUNCTION

console.log("Before");
getUser(1, getRepo);
console.log("After");

function displayComits(comits) {
  console.log(comits);
}
function getRepo(user) {
  console.log(user);
  getRepositories(user.gitHubName, getComits);
}
function getComits(repo) {
  console.log(repo);
  getAllComits(repo, displayComits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log(`Getting User ${id}`);
    callback({ id: id, gitHubName: "Adri" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log(`Getting Repo for user ${username}`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getAllComits(repo, callback) {
  setTimeout(() => {
    console.log(`Getting comits for repo ${repo}`);
    callback(["comit1", "comit2", "comit3"]);
  }, 2000);
} */
// better solution : promises
//****************************PROMISES ***************************/

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let userTmp;
      userTmp = { id: id, gitHubName: "Adri" };
      if (userTmp == undefined) {
        reject(new Error("user not found"));
      }
      resolve(userTmp);
    }, 2000);
  });
}

function getRepositories(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      repoTmp = ["repo1", "repo2", "repo3"];
      if (!repoTmp) {
        reject(new Error("Repos not found"));
      }
      console.log(`Getting Repo for user ${user.gitHubName}`);
      resolve(repoTmp);
    }, 2000);
  });
}

function getComits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let comits;
      //comits = ["comit1", "comit2", "comit3"];
      if (comits == undefined) {
        reject(new Error("comits not found"));
      }
      console.log(`Getting comits for repos ${repo}`);
      resolve(comits);
    }, 2000);
  });
}

/* console.log("Before");
getUser(1)
  .then((user) => getRepositories(user))
  .then((repo) => getComits(repo))
  .catch((err) => console.log(err.message));
console.log("After");
 */

/**************ASYNC / AWAIT ********************************/
async function displayComits() {
  console.log("Before");
  try {
    const user = await getUser(1);
    const repositories = await getRepositories(user);
    const comits = await getComits(repositories);
    console.log(comits);
  } catch (err) {
    console.log("Error", err);
  }
  /* const repo = getRepositories(user); */
  console.log("After");
}
displayComits();
