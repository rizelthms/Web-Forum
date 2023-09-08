document.getElementById("addUser").onclick = function () {
    location.href = "./addUser/addUser.html";
};

var users = []
async function getUsers() {
    const response = await fetch("http://localhost:8080/api/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw 'Error';
    }
    return await response.json();
}
getUsers().then(response => {
    users = response;
    response.forEach(element => {
        let div = document.createElement("div");
        div.style.backgroundColor = 'orange';
        div.style.width = "50%";
        div.style.margin = "auto";
        div.style.padding = "1.5%";
        
        let title=document.createElement("p");
        title.innerText="Username : "+element.userName;
        div.appendChild(title);
        title=document.createElement("p");
        title.innerText="Role : "+element.userRole;
        div.appendChild(title);
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () { deleteUser(element.id); });
        div.appendChild(deleteButton);

        let approveButton = document.createElement("button");
        approveButton.textContent = "Update";
        approveButton.addEventListener("click", function () { updateUser(element.id); });
        div.appendChild(approveButton);

        document.body.appendChild(div);
        document.body.appendChild(document.createElement("br"));
    });

}).catch(error => {
    alert("error");
});

async function deleteUser(i) {
    const response = await fetch("http://localhost:8080/api/user/" + i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw 'Error';
    }
    location.reload();
}

async function updateUser(i) {
    sessionStorage.setItem("update",JSON.stringify(users.find(element=>element.id==i)));
    location.href = "./updateUser/updateUser.html";
}

document.getElementById("back").onclick = function () {
    location.href = "../dashBoard.html";
};