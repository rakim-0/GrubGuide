// /**
//  *  This file contains the functions to check and store the userId
//  */
// function checkIfUserIdExists() {
//     return localStorage.getItem("userId") !== null;
// }

// function setUserId(userId) {
//     localStorage.setItem("userId", userId);
// }
// function removeUserId() {
//     localStorage.removeItem("userId");
// }

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }
// async function checkUserId(id) {
//     let response = await fetch(`http://localhost:8080/api/user/${id}`);
//     return response.status == 200;
// }
// async function generateUserId() {
//     let newUserId = getRandomInt(10000); // 9000 to 9999 is reserved for random userId
//     while (await checkUserId(newUserId)) {
//         newUserId++;
//     }
//     return newUserId;
// }

// function checkLogin() {
//     const loggedin = document.getElementById("logged-in");
//     if (loggedin) {
//         return true;
//     }
//     return false;
// }

// window.onload = async function () {
//     if (checkLogin()) {
//         removeUserId();
//     } else {
//         if (!checkIfUserIdExists()) {
//             setUserId(await generateUserId());
//         }
//     }
// };
