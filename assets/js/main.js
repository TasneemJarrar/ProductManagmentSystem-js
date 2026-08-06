const modebtn = document.getElementById("mode-toggle");
const modeicon = document.getElementById("mode-icon");
const html = document.documentElement;
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const count = document.querySelector("#count");
const category = document.querySelector("#category");
const createbtn = document.querySelector("#createbtn");
const totalContainer = document.querySelector("#totalContainer");
const productsTable = document.querySelector("#productsTable");
const equalSign = document.querySelector(".equalSign");
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
    total.innerHTML = result;
    totalContainer.classList.remove("bg-rose-400/70", "dark:bg-rose-500/40");
    totalContainer.classList.add("bg-emerald-400/70", "dark:bg-emerald-500/40");
    equalSign.classList.remove("hidden");
  } else {
    console.log("in");
    total.innerHTML = "";
    totalContainer.classList.remove("bg-rose-400/70", "dark:bg-rose-500/40");
    totalContainer.classList.add("bg-emerald-400/70", "dark:bg-emerald-500/40");
    equalSign.classList.add("hidden");
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
    id: 1,
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
  showData();
  console.log(products);
};

// save to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

// clear inputs
const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

// read
const showData = () => {
  let table = '';
  products
    .map(
      (product) =>
        (table += `
        <tr class="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
          <td class="p-3 text-sm">${+product.id++}</td>
          <td class="p-3">${product.title}</td>
          <td class="p-3">${product.taxes}</td>
          <td class="p-3">${product.ads}</td>
          <td class="p-3 font-semibold">${product.discount}</td>
          <td class="p-3">${product.total}</td>
          <td class="p-3 font-semibold">${product.category}</td>
          <td class="p-3">${product.price}</td>
          <td class="p-3">
            <button
              class="px-2 py-1 bg-purple-300 dark:bg-purple-500 text-white rounded-md hover:bg-purple-400 dark:hover:bg-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
              </svg>
            </button>
            <button class="px-2 py-1 bg-red-500 text-white rounded-md ml-2 hover:bg-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3.713-4.288Q11 16.426 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288" />
              </svg>
            </button>
          </td>
      </tr>
  `),
    )
    .join("");

  productsTable.innerHTML = table;
};
// count
// delete
// update
// search
// clean data

showData();
