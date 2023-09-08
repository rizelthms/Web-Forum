var categories;
document.getElementById("addCategory").onclick = function () {
        location.href = "./createCategory/createCategory.html";
};

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
        categories = response;
        response.forEach(element => {
                let div = document.createElement("div");
                div.style.backgroundColor = 'orange';
                div.style.width = "50%";
                div.style.margin = "auto";
                div.style.padding = "1.5%";
                let title = document.createElement("p");
                title.innerText = "Category : " + element.categoryName;
                div.appendChild(title);

                let button = document.createElement("button");
                button.textContent = "Update";
                button.addEventListener("click", function () { updateCategory(element.id); });
                div.appendChild(button);
                button = document.createElement("button");
                button.textContent = "Delete";
                button.addEventListener("click", function () { deleteCategory(element.id); });
                div.appendChild(button);

                document.body.appendChild(div);
                document.body.appendChild(document.createElement("br"));
        });
}).catch(error => {
        alert("error");
});

async function deleteCategoryfromDB(i) {
        const response = await fetch("http://localhost:8080/api/forum-category/" + i, {
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

function deleteCategory(i) {
        deleteCategoryfromDB(i);
}

function updateCategory(i) {
        sessionStorage.setItem("update", JSON.stringify(categories.find(element => element.id == i)));
        location.href = "./updateCategory/updateCategory.html";
}

document.getElementById("back").onclick = function () {
        location.href = "../dashBoard.html";
};