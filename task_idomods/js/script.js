const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
const productGrid = document.getElementById("productGrid");
const popup = document.getElementById("popup");
const popupOverlay = document.getElementById("popupOverlay");
const popupContent = document.getElementById("popupContent");
const closePopup = document.getElementById("closePopup");
const pageSizeSelect = document.getElementById("pageSize");

let pageNumber = 1;
let pageSize = 20;
let isLoading = false;

const fetchProducts = () => {
    if (isLoading) return;

    isLoading = true;
    fetch(`${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => response.json())
        .then((result) => {
            result.data.forEach((product) => createProductCard(product));
            isLoading = false;
            pageNumber++;
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            isLoading = false;
        });
};

const createProductCard = (product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
                <h3>ID:${product.id}</h3>
            `;

    card.addEventListener("click", () => openPopup(product));
    productGrid.appendChild(card);
};

const openPopup = (product) => {
    popupContent.innerHTML = `
                <h2>Nazwa: ${product.id}</h2>
                <h2>Wartość: ${product.text}</h2>
            `;
    popup.style.display = "block";
    popupOverlay.style.display = "block";
};

const closePopupHandler = () => {
    popup.style.display = "none";
    popupOverlay.style.display = "none";
};

closePopup.addEventListener("click", closePopupHandler);
popupOverlay.addEventListener("click", closePopupHandler);

pageSizeSelect.addEventListener("change", (e) => {
    pageSize = parseInt(e.target.value, 10);
    pageNumber = 1;
    productGrid.innerHTML = "";
    fetchProducts();
});

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchProducts();
    }
});

fetchProducts();

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".header-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const hamburgerButton = document.querySelector(".hamburger");

    buttons.forEach((button) => {
        button.addEventListener("click", function() {
            const sectionId = button.id;
            const targetSection = document.getElementById(`${sectionId}-section`);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });

                if (mobileMenu.classList.contains("open")) {
                    hamburgerButton.classList.toggle("open");
                    mobileMenu.classList.toggle("open");
                }
            }
        });
    });
});