const form = document.querySelector(".form");
const nameInput = document.querySelector(".name");
const priceInput = document.querySelector(".price");
const cycleInput = document.querySelector(".cycle");
const dateInput = document.querySelector(".date");
const categoryInput = document.querySelector(".category");
const sortInput = document.querySelector(".sort");
const list = document.querySelector(".list");
const amount = document.querySelector(".amount");

const categoryColors = {
  Entertainment: "bg-purple-100 text-purple-700",
  Work: "bg-blue-100 text-blue-700",
  Education: "bg-green-100 text-green-700",
  Utilities: "bg-yellow-100 text-yellow-700",
};

let subscriptions = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const sub = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    cycle: cycleInput.value,
    date: dateInput.value,
    category: categoryInput.value,
  };

  console.log(sub);

  subscriptions.push(sub);
  form.reset();


})