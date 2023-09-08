async function login(user) {
    const response = await fetch("http://localhost:8080/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw 'Error';
    }
    return await response.json();
}
document.getElementById("loginButton").onclick = function () {
    login({
        'userName': document.getElementById("username").value,
        'password': document.getElementById("password").value
    }).then(response => {
        sessionStorage.setItem("user", JSON.stringify(response));
        location.href = "./dashboard/dashBoard.html";
    }).catch(error => {
        alert("Invalid Credentials");
    });
};
