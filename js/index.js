//get total

let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let mood = 'create';
let tmp;
console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#39CE23";
  } else {
    total.innerHTML = "";
    total.style.background = "#D92114";
    total.style.color = "#E9EAEC";
  }
}
//create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
 if(mood === 'create' ) {
  if (newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
  } else {
    dataPro.push(newPro);
  }}else{
     dataPro [tmp] = newPro;
  }

  //save localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));

  console.log(newPro);

  clearData();
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "#FAD02C";
}

//read
function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += ` 
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
     `;
    console.log(table);
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");

    if (dataPro.length > 0) {
      btnDelete.innerHTML = `
  <button onclick="deleteAll()" >delete All(${dataPro.length})</button>
  `;
    } else {
      btnDelete.innerHTML = "";
    }
  }
}
showData();
//count
//delete

function deleteData(i) {
  console.log(i);
  localStorage.removeItem("product");
  dataPro.splice(i, 1);
  if (i == 0) {
    document.getElementById("tbody").innerHTML = " ";
    document.getElementById("deleteAll").innerHTML = " ";
  }
  showData();
}

function deleteAll() {
  dataPro = [];
  localStorage.clear();
  document.getElementById("tbody").innerHTML = " ";
  document.getElementById("deleteAll").innerHTML = " ";
  showData();
}

//update
function updateData(i){

  title.value = dataPro[i].title;
 price.value = dataPro[i].price;
 taxes.value = dataPro[i].taxes;
 ads.value = dataPro[i].ads;
 discount.value = dataPro[i].discount;
getTotal()
 category.value = dataPro[i].category;
count.style.display = 'none';
   submit.innerHTML ='Update' ;
   mood = 'update';
   tmp = i;
}