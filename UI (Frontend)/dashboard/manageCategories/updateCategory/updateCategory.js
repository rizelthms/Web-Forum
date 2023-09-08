async function addCategoryToBackend(input) {
    const response = await fetch("http://localhost:8080/api/forum-category/" + category.id, {
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
category = JSON.parse(sessionStorage.getItem("update"))
document.getElementById("categoryName").value = category.categoryName
document.getElementById("updateCategoryButton").onclick = function () {
    addCategoryToBackend({
        'categoryName': document.getElementById("categoryName").value
    }).then(response => {
        location.href = "../manageCategories.html";
    }).catch(error => {
        alert("Error");
    });
};

document.getElementById("back").onclick = function () {
    location.href = "../manageCategories.html";
};