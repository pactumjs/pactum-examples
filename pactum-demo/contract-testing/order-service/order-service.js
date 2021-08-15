const polka = require('polka');
const phin = require('phin');

const app = polka();

app.use(bodyParser);

app.post('/api/order-service/v1/orders', async (req, res) => {
    res.setHeader('content-type', 'application/json');
    const order = req.body;
    const product = order.product;
    const response = await phin({ method: 'GET', url: `http://localhost:4000/api/inventory-service/v1/products?name=${product}`, parse: 'json' });
    
    if (response.statusCode === 200) {
        const inStock = response.body.InStock;
        if (inStock) {
            res.end(JSON.stringify({ message: "order placed" }));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "product is out-of-stock" }));
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "product not found" }));
    }
});

app.listen(3000, () => {
    console.log('order-service running on port', 3000);
});

function bodyParser(req, res, next) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      req.body = JSON.parse(body);
      next();
    });
  }