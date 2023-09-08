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

if (JSON.parse(sessionStorage.getItem("user")).userRole == 'POST_CREATOR') {
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("manageCategories").style.display = "none";
}
else if (JSON.parse(sessionStorage.getItem("user")).userRole == 'READER') {
    document.getElementById("createPost").style.display = "none";
    document.getElementById("manageUsers").style.display = "none";
    document.getElementById("managePosts").style.display = "none";
    document.getElementById("manageCategories").style.display = "none";
}
document.getElementById("createPost").onclick = function () {
    location.href = "./createPost/createPost.html";
};
document.getElementById("manageUsers").onclick = function () {
    location.href = "./manageUser/manageUser.html";
};
document.getElementById("managePosts").onclick = function () {
    location.href = "./managePost/managePost.html";
};
document.getElementById("manageCategories").onclick = function () {
    location.href = "./manageCategories/manageCategories.html";
};
document.getElementById("logout").onclick = function () {
    sessionStorage.clear();
    location.href = "../index.html";
};

async function getPosts() {
    const response = await fetch("http://localhost:8080/api/forum?status=APPROVED", {
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

        document.body.appendChild(div);
        document.body.appendChild(document.createElement("br"));
    });
}).catch(error => {
    alert("error");
});
