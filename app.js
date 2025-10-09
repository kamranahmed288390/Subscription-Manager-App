const form = document.querySelector(".form");
const nameInput = document.querySelector(".name");
const priceInput = document.querySelector(".price");
const cycleInput = document.querySelector(".cycle");
const dateInput = document.querySelector(".date");
const categoryInput = document.querySelector(".category");
const sortInput = document.querySelector(".sort");
const list = document.querySelector(".list");
const amount = document.querySelector(".amount");
const popup = document.getElementById("popup");

const categoryColors = {
  Entertainment: "bg-purple-100 text-purple-700",
  Work: "bg-blue-100 text-blue-700",
  Education: "bg-green-100 text-green-700",
  Utilities: "bg-yellow-100 text-yellow-700",
};

let subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];

function saveToLocalStorage() {
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

function showPopup() {
  popup.classList.remove("hidden");
  popup.classList.add("block");
  setTimeout(() => {
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.classList.remove("block", "fade-out");
      popup.classList.add("hidden");
    }, 500);
  }, 3000);
}

function renderSubs() {
  list.innerHTML = '';
  let total = 0;
  let dueSoonExists = false;

  let sortedSubs = [...subscriptions];
  const sortBy = sortInput.value;

  if (sortBy === "name") {
    sortedSubs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "price") {
    sortedSubs.sort((a, b) => a.price - b.price);
  } else if (sortBy === "date") {
    sortedSubs.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  sortedSubs.forEach((sub, index) => {
    const monthlyCost = sub.cycle === "Yearly" ? sub.price / 12 : sub.price;
    total += monthlyCost;

    const today = new Date();
    const renewalDate = new Date(sub.date);
    const diff = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
    const dueSoon = diff <= 7 && diff >= 0;

    if (dueSoon) {
      dueSoonExists = true;
    }

    const card = document.createElement("div");
    card.className = `subscription-card animate-fade-in flex justify-between items-center border p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
      dueSoon ? "border-red-400 bg-red-50" : "bg-white border-gray-200"
    }`;

    card.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800 flex items-center gap-2">${sub.name}
          <span class="px-3 py-1 rounded-full text-sm ${categoryColors[sub.category]}">${sub.category}</span>
          ${dueSoon ? `<span class="text-red-600 font-bold text-sm animate-pulse">Due soon</span>` : ""}
        </p>
        <p class="text-md font-bold mt-2">₨${sub.price} / ${sub.cycle}</p>
        <p class="text-sm text-gray-500 mt-2">Renewal: ${sub.date}</p>
      </div>
      <button class="delete bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition transform hover:scale-105" data-index="${subscriptions.indexOf(sub)}">Delete</button>
    `;

    list.appendChild(card);
  });

  if (dueSoonExists) {
    showPopup();
  }

  amount.textContent = `₨${total.toFixed(2)}`;
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

  subscriptions.push(sub);
  saveToLocalStorage();
  form.reset();
  renderSubs();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const index = e.target.getAttribute("data-index");
    subscriptions.splice(index, 1);
    saveToLocalStorage();
    renderSubs();
  }
});

sortInput.addEventListener("change", renderSubs);

// Initial load
renderSubs();
