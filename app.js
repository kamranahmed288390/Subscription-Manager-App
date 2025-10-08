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

function renderSubs() {
  list.innerHTML = '';
  let total = 0;

  subscriptions.forEach((sub, index)=> {
    const monthlyCost = sub.cycle === "Yearly" ? sub.price / 12 :
      sub.price
    total += monthlyCost

    const today = new Date();
    const renewalDate = new Date(sub.date);
    const diff = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
    const dueSoon = diff <= 7 && diff >= 0;
    const card = document.createElement("div");
    card.className = `flex justify-between items-center border p4 rounded-lg shadow-sm ${dueSoon ? "border-red-400 bg-red-50" : "bg-gray-50 border-gray-200"}`

    card.innerHTML = `<div>
    <p class="font-semibold text-gray-800 flex items-center gap-2">${sub.name} 
    <span class="px-5 py-2 rounded-full text-sm ${categoryColors[sub.category]}"> ${sub.category}
    </span>
    ${dueSoon ? `<span class="text-red-600 font-bold-text-sm">Due soon</span>` : ""}
    
    </p>
    <p class="text-md font-bold mt-2">${sub.price} / ${sub.cycle} </p>
    <p class="text-sm text-black-300 mt-2">Renewal: ${sub.date}</p>

    
    
    </div>
    <button class="delete bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 tarnsition" "data-index=${index}">Delete</button>`
    list.appendChild(card)
  });
  amount.textContent = `${total.toFixed(2)}`;

}

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
  renderSubs();


})