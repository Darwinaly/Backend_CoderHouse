import express from 'express'
import {ProductMananger} from './productMananger.js'

const app = express();
const mananger = new ProductMananger('products.json');

app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await mananger.getProducts()
    
        if (!limit || limit < 1){
            return res.send({succes: true, products});
        }
    
        const productLimit = products.slice(0, limit);
    
        res.send({succes: true, products: productLimit});
    } catch (error) {
        console.log(error)
        res.send({succes: false, error: 'Ha ocurrido un error' })
    }
})


app.get ("/products/:id", async (req, res) => {
    try {
        const { id: paramId} = req.params;
        const id = Number(paramId);
        

        if(id < 0){
            return res.send({succes: false, error: "Id invalido"});
        }

        const product = await mananger.getProductsById(id);
        
        

        if(!product){
            return res.send({succes: false, error: "Producto no encontrado"});
        }

        res.send({succes: true, product});

    } catch (error) {
        console.log(error);
        res.send({succes: false, error: "Ha ocurrido un error"})
    }
})



app.listen(8080)