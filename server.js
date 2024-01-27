
const express = require('express')

const app = express()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("HELLO WELCOME TO EXPRESS")
})
const products = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "category": "men's clothing",
        },
        {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "category": "men's clothing",
        },
        {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "category": "men's clothing",
        },
        {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "category": "men's clothing",
        },
        {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "category": "jewelery",
        }
]
app.get("/api/products",(req,res) => {
    
    res.status(200).json(products)
})

app.get("/api/products/:id",(req,res) => {
    const id = Number(req.params.id)
    let singleData =  products.find((prod) => {
        return prod.id === id
    })
    // res.json(singleData)
    if(singleData){
        res.json(singleData)
    }else{
        res.status(404).send("RESOURCE NOT FOUND")
    }
})

app.post("/api/products",(req,res) => {
   
    const id = products.length + 1;
    const addProduct = {
        id:id,
        title:req.body.title,
        price:req.body.price,
        category:req.body.category
    }
    products.push(addProduct)
    res.send({
        message:"Product Created Succesfully",
        id
    })
})

app.put("/api/products/:id",(req,res) => {
    const id = Number(req.params.id)
    const idx = products.findIndex((data) => {
        return data.id === id
    })
    products[idx].title = req.body.title,
    products[idx].price = req.body.price
    console.log('idx::',idx)
    res.send("Product updated succesfully")
})

app.delete("/api/products/:id",(req,res) => {
    const id = Number(req.params.id)
    const index = products.findIndex((data) => {
        return data.id === id
    })
    products.splice(index,1)
    res.send({
        message:"Product Deleted Succesfully",
        products:products
    })
})
const port = 4000


app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})