let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = "create";
let temp;
//get total 

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.textContent = result;
        total.style.background = "#040"
    } else {
        total.textContent = ""
        total.style.background = "#f01"
    }
}


//creat product 
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}

submit.onclick = function () {



    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value != "" && price.value != "" && newPro.count < 99) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[temp] = newPro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block"
        }
        clearData();

    }
    localStorage.setItem('product', JSON.stringify(dataPro));


    showData();

}

//clear data

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.textContent = '';
    count.value = '';
    category.value = '';
}

//read 

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
                <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
            
            </tr>
        
        `

    }
    document.getElementById("tbody").innerHTML = table;
    let delAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {

        delAll.innerHTML = `<button onclick='deleteAll()'>delete All (${dataPro.length})</button>`

    } else {
        delAll.innerHTML = ""
    }
    console.log(table);
}

showData();

//delete 

function del(e) {

    dataPro.splice(e, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update 

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    getTotal();
    mood = "update";
    temp = i;

    scroll({
        top: 0,
        behavior: "smooth"
    })

}

//search 
let searachMood = "title";

function getSerachMood(id) {
    let search = document.getElementById("serach")
    if (id == "searchTitle") {
        searachMood = "title";

    } else {
        searachMood = "category";

    }
    search.placeholder = "Search By " + searachMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searachMood == "title") {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
                    <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
                
                </tr>
            
            `
            }

        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick = 'updateData(${i})'>update</button></td>
                    <td><button id="delete" onclick = 'del(${i})'>delete</button></td>
                
                </tr>
            
            `

            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}