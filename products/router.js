const Router = require('express').Router
const Product = require('./model')

const router = new Router()

router.get('/products', (req, res) => {
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

router.get('/products/:id', (req, res) => {
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
router.post('/products', (req, res) => {
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
router.put('/products/:id', (req, res) => {
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

module.exports = router
