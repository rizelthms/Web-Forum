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
    let select=document.getElementById("category");
    response.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.categoryName;
        select.appendChild(option);
    });
}).catch(error => {
    alert("error");
});

async function savePostToBackend(input){
    const response = await fetch("http://localhost:8080/api/forum", {
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

document.getElementById("createPostButton").onclick = function () {
    savePostToBackend({
        'title': document.getElementById("title").value,
        'content': document.getElementById("content").value,
        'forumCategory': document.getElementById("category").value,
        'forumStatus':'DRAFT',
        'userId': JSON.parse(sessionStorage.getItem("user")).id
    }).then(response => {
        location.href = "../dashboard.html";
    }).catch(error => {
        alert("Error");
    });
};

document.getElementById("back").onclick = function () {
    location.href = "../dashBoard.html";
};