var posts = []
var category;
async function getCategories() {
    const response = await fetch("http://localhost:8080/api/forum-category", {
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

getCategories().then(response => {
    category = response;
}).catch(error => {
    alert("error");
});
async function getPosts() {
    const response = await fetch("http://localhost:8080/api/forum", {
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
getPosts().then(response => {
    posts = response;
    if (JSON.parse(sessionStorage.getItem("user")).userRole != 'ADMIN') {
        posts = response.filter(elem => elem.userId == JSON.parse(sessionStorage.getItem("user")).id);
        response = posts;
    }
    if (JSON.parse(sessionStorage.getItem("user")).userRole == 'ADMIN') {
        response.forEach(element => {
            let div = document.createElement("div");
            div.style.backgroundColor = 'orange';
            div.style.width = "50%";
            div.style.margin = "auto";
            div.style.padding = "1.5%";

            let title = document.createElement("p");
            title.innerText = "Title : " + element.title;
            div.appendChild(title);
            title = document.createElement("p");
            title.innerText = "Content : " + element.content;
            div.appendChild(title);
            title = document.createElement("p");
            title.innerText = "Category : " + category.find(elem => elem.id == element.forumCategory).categoryName;
            div.appendChild(title);

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () { deletePost(element.id); });
            div.appendChild(deleteButton);

            if (element.forumStatus == 'DRAFT') {
                let approveButton = document.createElement("button");
                approveButton.textContent = "Approve";
                approveButton.addEventListener("click", function () { approvePost(element.id); });
                div.appendChild(approveButton);

                let rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.addEventListener("click", function () { rejectPost(element.id); });
                div.appendChild(rejectButton);
            }

            if (JSON.parse(sessionStorage.getItem("user")).id == element.userId) {
                let updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.addEventListener("click", function () { updatePost(element.id); });
                div.appendChild(updateButton);
            }

            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
        });
    }
    else {
        response.forEach(element => {
            let div = document.createElement("div");
            div.style.backgroundColor = 'orange';
            div.style.width = "50%";
            div.style.margin = "auto";
            div.style.padding = "1.5%";

            let title = document.createElement("p");
            title.innerText = "Title : " + element.title;
            div.appendChild(title);
            title = document.createElement("p");
            title.innerText = "Content : " + element.content;
            div.appendChild(title);
            title = document.createElement("p");
            title.innerText = "Category : " + category.find(elem => elem.id == element.forumCategory).categoryName;
            div.appendChild(title);

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () { deletePost(element.id); });
            div.appendChild(deleteButton);

            if (JSON.parse(sessionStorage.getItem("user")).id == element.userId) {
                let updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.addEventListener("click", function () { updatePost(element.id); });
                div.appendChild(updateButton);
            }

            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
        });
    }
}).catch(error => {
    alert("error");
});

async function deletePost(i) {
    const response = await fetch("http://localhost:8080/api/forum/" + i, {
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

async function approvePost(i) {
    let currentPost = posts.find(elem => elem.id == i);
    currentPost.forumStatus = 'APPROVED'
    const response = await fetch("http://localhost:8080/api/forum/" + i, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentPost)
    });
    if (!response.ok) {
        throw 'Error';
    }
    location.reload();
}

async function rejectPost(i) {
    let currentPost = posts.find(elem => elem.id == i);
    currentPost.forumStatus = 'REJECTED'
    const response = await fetch("http://localhost:8080/api/forum/" + i, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentPost)
    });
    if (!response.ok) {
        throw 'Error';
    }
    location.reload();
}

document.getElementById("back").onclick = function () {
    location.href = "../dashBoard.html";
};

function updatePost(i){
    let currentPost = posts.find(elem => elem.id == i);
    sessionStorage.setItem("update", JSON.stringify(currentPost));
    location.href = "./updatePost/updatePost.html";
}
