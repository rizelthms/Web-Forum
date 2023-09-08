async function saveUserToBackend(input){
    const response = await fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    });
    if (!response.ok) {
        throw 'Error';
    }
    return await response.json();
}

document.getElementById("createUserButton").onclick = function () {
    saveUserToBackend({
        'userName': document.getElementById("username").value,
        'password': document.getElementById("password").value,
        'userRole': document.getElementById("userRole").value,
        'isActive': true
    }).then(response => {
        location.href = "../manageUser.html";
    }).catch(error => {
        alert("Error");
    });
};

document.getElementById("back").onclick = function () {
    location.href = "../manageUser.html";
};