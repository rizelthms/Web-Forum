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
    let select = document.getElementById("category");
    response.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.categoryName;
        select.appendChild(option);
    });
}).catch(error => {
    alert("error");
});

async function savePostToBackend(input) {
    const response = await fetch("http://localhost:8080/api/forum/" + post.id, {
        method: 'PUT',
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
var post = JSON.parse(sessionStorage.getItem("update"))
document.getElementById("title").value=post.title;
document.getElementById("content").value=post.content;
document.getElementById("category").value=post.forumCategory

document.getElementById("updatePostButton").onclick = function () {
    savePostToBackend({
        'title': document.getElementById("title").value,
        'content': document.getElementById("content").value,
        'forumCategory': parseInt(document.getElementById("category").value),
        'forumStatus': 'DRAFT',
        'userId': post.userId
    }).then(response => {
        location.href = "../managePost.html";
    }).catch(error => {
        alert("Error");
    });
};

document.getElementById("back").onclick = function () {
    location.href = "../managePost.html";
};