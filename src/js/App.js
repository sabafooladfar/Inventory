import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded" , ()=>{
    CategoryView.setApp();
    CategoryView.createCategoriesList();
    ProductView.setApp();
    ProductView.createProductsList(ProductView.products);
})