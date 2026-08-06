const modebtn = document.getElementById("mode-toggle");
const modeicon = document.getElementById("mode-icon");
const html = document.documentElement;
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let createbtn = document.querySelector("#createbtn");
let totalContainer = document.querySelector("#totalContainer");

if (localStorage.getItem("theme") == "dark") {
  html.classList.add("dark");
  modeicon.classList.replace("fa-moon", "fa-sun");
}

modebtn.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    modeicon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    modeicon.classList.replace("fa-sun", "fa-moon");
  }
});

// get total
const getTotal = () => {
  if (price.value && taxes.value && ads.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = ": " + result;
    totalContainer.classList.remove("bg-rose-400/70", "dark:bg-rose-500/40");
    totalContainer.classList.add("bg-emerald-400/70", "dark:bg-emerald-500/40");
  } else {
    total.innerHTML = "";
    totalContainer.classList.add("bg-rose-400/70", "dark:bg-rose-500/40");
  }
};


let products;
if (localStorage.getItem("products") === null) products = [];
else {
  products = JSON.parse(localStorage.products);
}

// create products
createbtn.onclick = (e) => {
  e.preventDefault();
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  products.push(newProduct);
  saveToLocalStorage();
  clearData();
  console.log(products);
};

// save to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

// clear inputs
const clearData = () =>{
  title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  total.innerHTML="";
  count.value="";
  category.value="";
}

// read
// count
// delete
// update
// search
// clean data
