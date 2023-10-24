import express from 'express';
import productsRouter from './router/routerProducts.js'; 
import cartsRouter from './router/routerCarts.js';    

const app = express();
const port = 8080

app.get('/', (req, res) => {
  res.send('Mi e-commerce');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);      

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
