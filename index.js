const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

var Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres')

app.listen(process.env.PORT || 4001, () => console.log('Express API listening on port 4001'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }})

app.get('/products', (req, res) => {
  const products = Product
    .findAll()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the products. Please try again' })
    })
})

app.get('/products/:id', (req, res) => {
  const products = Product
    .findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product)
      } else {
        res.status(404)
        res.json({ message: 'Product not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the product. Please try again' })
    })
})

//Create New Products
app.post('/products', (req, res) => {
  const product = req.body

  Product.crete(product)
  .then(entity => {
    res.status(201)
    res.json(entity)
})
  .catch(err => {
    res.status(422)
    res.json({ message: err.message })
  })
})

//Edit products
app.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body
  // find the product in the DB
  Product.findById(req.params.id)
    .then(entity => {
      // change the product and store in DB
      return entity.update(updates)
    })
    .then(final => {
      // respond with the changed product and status code 200 OK
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })

})
