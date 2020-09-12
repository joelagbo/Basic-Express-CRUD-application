const express = require("express");
const app = express();
const port = 3000;

let bodyParser = require("body-parser");
app.use(bodyParser.json());

let products = [];

app.post("/products", function (req, res) {
  //define the new product to be added
  const newProduct = { ...req.body, id: products.length + 1 };
  products = [...products, newProduct];
  //implement product addition to the database
  res.json(newProduct);
});

app.put("/products", function (req, res) {
  //a function to fetch and verify the id of product to be updated
  let updatedProduct;
  products = products.map((p) => {
    if (p.id === req.body.id) {
      updatedProduct = { ...p, ...req.body };
      return updatedProduct;
    }
    return p;
  });
  // implement product update
  res.json(updatedProduct);
});

app.delete("/products/:id", function (req, res) {
  //fetch  the product to be deleted and filter it out
  const deletedProduct = products.find((p) => p.id === +req.params.id);
  products = products.filter((p) => p.id !== +req.params.id);
  // implement product delete
  res.json(deletedProduct);
});

app.get("/products", (req, res) => {
  // implementing product fetching
  res.json(products);
});

app.listen(port, () => console.log(`listening activated on port ${port}!`));
