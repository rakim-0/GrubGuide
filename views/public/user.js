/**
 *  This file contains the functions to check and store the userId
 */
function checkIfUserIdExists() {
    return localStorage.getItem("userId") !== null;
}

function setUserId(userId) {
    localStorage.setItem("userId", userId);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function generateUserId() {
    const newUserId = 9000 + getRandomInt(1000); // 9000 to 9999 is reserved for random userId
    return newUserId;
}


window.onload = function () {
    const userid = document.getElementById("userid");
    if (userid) {
        setUserId(userid.textContent);
    } else {
        setUserId(generateUserId());
    }
};