export default class Storage {
    static getAllCategories() {
        const allCategories = JSON.parse(localStorage.getItem("category")) || [];
        const sortedCategories = allCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    }
    static saveCategory(category) {
        const categories = Storage.getAllCategories();
        const existedCategory = categories.find((c) => c.id == category.id);
        if (existedCategory) {
            existedCategory.title = category.title;
            existedCategory.discription = category.discription;
        } else {
            category.id = new Date().getTime();
            category.createdAt = new Date().toISOString();
            categories.push(category);
        }
        localStorage.setItem("category", JSON.stringify(categories));
    }

    static getAllProducts(sort = "newest") {
        const allProducts = JSON.parse(localStorage.getItem("product")) || [];
        return allProducts.sort((a, b) => {
            if (sort === "newest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            } else if (sort === "oldest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            }

        });
    }
    static saveProducts(product) {
        const products = Storage.getAllProducts();
        const existedProduct = products.find((p) => p.id == product.id);
        if (existedProduct) {
            existedProduct.title = product.title;
            existedProduct.category = product.category;
            existedProduct.quantity = product.quantity;
        } else {
            product.id = new Date().getTime();
            product.createdAt = new Date().toISOString();
            products.push(product);
        }
        localStorage.setItem("product", JSON.stringify(products));
    }
    static deleteProducts(id){
        const allSavedProducts = Storage.getAllProducts();
        const filteredProducts = allSavedProducts.filter((p)=> p.id != id);
        localStorage.setItem("product" , JSON.stringify(filteredProducts));
    }
}