import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDiscription = document.querySelector("#category-discription");
const addNewCategoryBtn = document.querySelector("#add-new-category-btn");
const addNewCategoryQuestion = document.getElementById("add-new-category-Q");
const categoryBox = document.getElementById("category-box");
const cancelBtn = document.getElementById("cancel-btn");

class CategoryView {
    constructor() {
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        addNewCategoryQuestion.addEventListener("click", (e) => this.addNewCategoryBox(e));
        cancelBtn.addEventListener("click", (e) => this.hideCategoryBox(e));
        this.categories = [];
    }
    addNewCategory(e) {
        e.preventDefault();
        const title = categoryTitle.value;
        const discription = categoryDiscription.value;
        if (!title || !discription) return;
        Storage.saveCategory({
            title,
            discription
        });
        this.categories = Storage.getAllCategories();
        this.createCategoriesList();
        categoryTitle.value = "";
        categoryDiscription.value = "";
        e.preventDefault();
        categoryBox.classList.add("hidden");
        addNewCategoryQuestion.classList.remove("hidden");
    }
    setApp() {
        this.categories = Storage.getAllCategories();
    }
    createCategoriesList() {
        let result = `<option value="">Select a Category</option>`;
        this.categories.forEach((e) => {
            result += `<option value="${e.id}">${e.title}</option>`
        })
        document.querySelector(".category-list").innerHTML = result;
    }
    addNewCategoryBox(e){
        e.preventDefault();
        categoryBox.classList.remove("hidden");
        addNewCategoryQuestion.classList.add("hidden");
    }
    hideCategoryBox(e){
        e.preventDefault();
        categoryBox.classList.add("hidden");
        addNewCategoryQuestion.classList.remove("hidden");
    }
}


export default new CategoryView();