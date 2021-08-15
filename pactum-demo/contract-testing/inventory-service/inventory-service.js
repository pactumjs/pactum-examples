const polka = require('polka');

const app = polka();

app.get('/api/inventory-service/v1/products', (req, res) => {
    res.setHeader('content-type', 'application/json');
    if (req.query.name) {
        const filteredProducts = products.filter((product) => product.name === req.query.name);
        if (filteredProducts.length > 0) {
            res.end(JSON.stringify(filteredProducts[0]));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "product not found" }));
        }
    } else {
        res.end(JSON.stringify(products));
    }
});

app.listen(4000, () => {
    console.log('inventory-service running on port', 4000);
});

const products = [
    {
        "id": 1,
        "name": "iPhone",
        "InStock": true,
        "items": 147
    },
    {
        "id": 2,
        "name": "galaxy",
        "InStock": false,
        "items": 0
    }
];