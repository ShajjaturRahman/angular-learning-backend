console.log("Happy soul")
const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const morgan = require("morgan")
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eCom"
})

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(morgan("tiny"))
app.get("/", (req, res) => {
    return res.send("Hello API")
})

app.post("/product/add", (req, res) => {
    const{ name, price, stock} = req.body

    const sql = "INSERT INTO products(name, price, stock) VALUES(?, ?, ?)"
    db.query(sql, [name, price, stock], (err, result) => {
        if(err) throw err
        console.log(result);
    })

    return res.send({ message: "Product Added Successfully"})
})

// view product list

app.get("/product/list", (req, res) => {
    const sql = "SELECT * FROM products"
    db.query(sql,(err, result) => {
        if(err) throw err
        return res.send(result)
    })
})

app.patch("/product/update", (req, res) => {
    const { id, name, price, stock }  = req.body
    const sql = "UPDATE products SET name = ? , price= ?, stock = ? WHERE id = ?" 
    db.query(sql, [name, price, stock, id], (err, result) => {
        console.log(result);
    })

    return res.send({message: " Product Updated"})
})

app.delete("/product/delete/:id", (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM products WHERE id = ?"
    db.query(sql, id, (err, result) => {
        if(err) throw err
        return res.send({ message: "Product Deleted", result: result })
    })
})
app.listen(1010, ()=>{
    console.log('👀 API Server Running......')
    db.connect(err => {
        if(err){
            console.log('Error:', err.massege);

        }
        else{
            console.log(' DB Connected')
        }
    })
})