const pairs = [];
const input = document.getElementById("pairInput");
const ul = document.getElementById("pairList");
const addButton = document.getElementById("add");
const error = document.getElementById("error");
const sortByNameBtn = document.getElementById("sortByName");
const sortByValueBtn = document.getElementById("sortByValue");
const deleteBtn = document.getElementById("delete");
const savedPairs = localStorage.getItem("pairs");
if(savedPairs){
    const parsedPairs = JSON.parse(savedPairs);
    pairs.push(...parsedPairs);
    showList();
}
addButton.addEventListener("click", function (event) {
    event.preventDefault();
    const pair = input.value.trim();
    const splitPair = pair.split("=");
    if(splitPair.length !== 2) {
        error.innerText = 'The input format should be: name=value';
    }
    else {
        error.innerText = "";
        const regex = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/
        const name = splitPair[0].trim();
        const value = splitPair[1].trim();
        if(!regex.test(name)||!regex.test(value)) {
            error.innerText = 'Names and Values can contain only alpha-numeric characters';
        }
        else {
            pairs.push({name, value});
            input.value = "";
            saveInLocalStorage();
            showList();
        }
    }
});
function showList() {
    ul.innerHTML = "";
    pairs.forEach((pair) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox">${pair.name}=${pair.value}`;
        li.addEventListener('click', function (event) {
            const checkbox = li.querySelector("input[type='checkbox']");
            if(event.target !==checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });
        ul.appendChild(li);
    });
}
sortByNameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    pairs.sort(function (a, b) {
        if(a.name > b.name) {return 1}
        if(a.name < b.name) {return -1}
        return 0;
    });
    saveInLocalStorage();
    showList();
});
sortByValueBtn.addEventListener("click", function (event) {
    event.preventDefault();
    pairs.sort(function (a, b) {
        if(a.value > b.value) {return 1}
        if(a.value < b.value) {return -1}
        return 0;
    });
    saveInLocalStorage();
    showList();
})
deleteBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const newPairs = [];
    const list = ul.querySelectorAll('li');
    list.forEach((li,index) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        if(!checkbox.checked) {
            newPairs.push(pairs[index]);
        }
    })
    pairs.length = 0;
    pairs.push(...newPairs);
    saveInLocalStorage();
    showList()
})
function saveInLocalStorage() {
    localStorage.setItem('pairs', JSON.stringify(pairs));
}

