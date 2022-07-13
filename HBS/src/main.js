const express = require('express')
const app = express()
const { Router } = require('express')
const ClaseProductos = require("./Productos");
const exphbs = require("express-handlebars")
const bodyParser = require('body-parser')


const routerProductos = Router()
routerProductos.use(express.json())

app.engine("handlebars", exphbs.engine({extname:".handlebars", defaultLayout:"productos", defaultLayout: false}))
app.set("view engine", "handlebars")

app.set("views","./views")

const productos = new ClaseProductos([{                                                                                                                                                    
                              title: "Escuadra",                                                                                                                                 
                              price: 123.45,                                                                                                                                     
                              thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
                              id: 1                                                                                                                                              
                            },                                                                                                                                                   
                            {                                                                                                                                                    
                              title: "Calculadora",                                                                                                                              
                              price: 234.56,                                                                                                                                     
                              thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
                              id: 2                                                                                                                                              
                            },                                                                                                                                                   
                            {                                                                                                                                                    
                              title: "Globo Terráqueo",                                                                                                                          
                              price: 345.67,                                                                                                                                     
                              thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
                              id: 3                                                                                                                                              
                            }])

routerProductos.get('/', (req, res) => {
  res.render("productos", productos)  
})

routerProductos.get('/form', (req, res) => {
  res.render("form", productos)  
})

routerProductos.post('/', (req, res) => {
    console.log(req.body)
    let id
    if(productos.productos.length>0){
        id = productos.productos.at(-1).id + 1 
    }else{
        id = 1
    }   
    const producto = { id: id, ...req.body}
    productos.productos.push(producto)
    res.render("form")
})
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/productos', routerProductos)
app.use(express.static('public'));

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))