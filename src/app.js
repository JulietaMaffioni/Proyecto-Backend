const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Mi e-commerce');
});

const productsRouter = require('./router/routersProducts');
app.use('/api/products', productsRouter);

const cartsRouter = require('./router/routersCarts');
app.use('/api/carts', cartsRouter);


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
