const gameCards = [...document.querySelectorAll(".game-card")];
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#gameSearch");
const noResults = document.querySelector("#noResults");
const toast = document.querySelector("#toast");
const navLinks = document.querySelector(".nav-links");
const mobileMenu = document.querySelector("#mobileMenu");

let activeCategory = "all";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function filterGames() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  gameCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const categories = card.dataset.category.toLowerCase();
    const matchesSearch = !query || title.includes(query);
    const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
    const show = matchesSearch && matchesCategory;

    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  noResults.hidden = visible !== 0;
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    activeCategory = filter.dataset.category;
    filterGames();
  });
});

searchInput.addEventListener("input", filterGames);

document.querySelectorAll(".card-button").forEach(button => {
  button.addEventListener("click", () => {
    const game = button.dataset.game;
    showToast(`${game} is a demo card. Add your game link in script.js or the HTML.`);
  });
});

document.querySelector("#featuredButton").addEventListener("click", () => {
  showToast("Your featured game will go here.");
});

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.categoryJump;
    activeCategory = category;

    filters.forEach(filter => {
      filter.classList.toggle("active", filter.dataset.category === category);
    });

    filterGames();
    document.querySelector("#games").scrollIntoView({ behavior: "smooth" });
  });
});

mobileMenu.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  mobileMenu.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    mobileMenu.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
