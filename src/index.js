import {ProductMananger} from './productMananger.js'



const mananger = new ProductMananger('products.json');

(async () => {
    
    await mananger.addProduct({
        title: 'Beer',
        description: "IPA",
        price: 120,
        thumbnail: "N/A",
        code: 1234,
        stock: 200
    })

    console.log(await mananger.getProducts());

    await mananger.updateProduct(2, {
        title: 'Beer',
        description: "IPA",
        price: 140,
        thumbnail: "N/A",
        code: 1234,
        stock: 300
    })

    console.log(await mananger.getProducts());


})()

//mananger.getProductsById(2)
//mananger.deleteProduct(2)

