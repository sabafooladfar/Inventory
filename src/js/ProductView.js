import Storage from "./Storage.js";

const addNewProductBtm = document.getElementById("add-new-product-btn");
const productTitle = document.getElementById("product-title");
const productQuantity = document.getElementById("product-quantity");
const categoryList = document.querySelector(".category-list");
const searchInput = document.querySelector("#search-input");
const sortSelected = document.getElementById("sort-selected");

class ProductView {
    constructor() {
        addNewProductBtm.addEventListener("click", (e) => this.addNewProduct(e));
        searchInput.addEventListener("input", (e) => this.searchProduct(e));
        sortSelected.addEventListener("change", (e) => this.sortProducts(e));
        this.products = [];
    }
    setApp() {
        this.products = Storage.getAllProducts();
    }
    addNewProduct(e) {
        e.preventDefault();
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = categoryList.value;

        if (!title || !quantity || !category) return;
        Storage.saveProducts({
            title,
            quantity,
            category
        });
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
    }
    createProductsList(products) {
        let result = "";
        products.forEach((item) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category);
            result += `
            <div class="flex justify-between items-center mx-4">
                    <p class="product-name text-white">${item.title}</p>
                    <div class="flex">
                        <p class="date p-2 my-2 text-white">${new Date().toLocaleDateString("fa-IR")}</p>
                        <p class="category-name m-2 p-1 text-gray-400 border-gray-400 rounded-lg border">${selectedCategory.title}</p>
                        <p class="quantity-num p-1 m-2 border-4 text-white bg-slate-400 rounded-full">${item.quantity}</p>
                        <button class="text-white delete-btn ml-4" data-id="${item.id}">delete</button>
                    </div>
                </div>
            `;
        });
        document.getElementById("added-product-item").innerHTML = result;

        const deleteProductBtns = [...document.querySelectorAll(".delete-btn")];
        deleteProductBtns.forEach((item) => {
            item.addEventListener("click", (e) => this.deleteProduct(e));
        });
    }
    searchProduct(e) {
        const search = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(search));
        this.createProductsList(filteredProducts);
    }
    sortProducts(e) {
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductsList(this.products);
    }
    deleteProduct(e) {
        console.log(e.target);
        e.preventDefault();
        const productId = e.target.dataset.id;
        Storage.deleteProducts(productId);
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
    }
}

export default new ProductView();