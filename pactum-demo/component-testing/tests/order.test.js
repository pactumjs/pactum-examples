const pactum = require('pactum');
const { mock, request } = pactum;

before(async () => {
    await mock.start(4000);
    request.setBaseUrl('http://localhost:3000');
});

after(async () => {
    await mock.stop();
});

describe('Order Service', () => {

    it('should buy a product which is in-stock', async () => {
        await pactum.spec()
            .useInteraction({
                request: {
                    method: 'GET',
                    path: '/api/inventory-service/v1/products',
                    queryParams: { name: 'iPhone' }
                },
                response: {
                    status: 200,
                    body: { "InStock": true }
                }
            })
            .post('http://localhost:3000/api/order-service/v1/orders')
            .withJson({
                "product": "iPhone"
            })
            .expectStatus(200);
    });

    it('should buy a product which is out-of-stock', async () => {
        await pactum.spec()
            .useInteraction({
                request: {
                    method: 'GET',
                    path: '/api/inventory-service/v1/products',
                    queryParams: { name: 'iPhone' }
                },
                response: {
                    status: 200,
                    body: { "InStock": false }
                }
            })
            .post('http://localhost:3000/api/order-service/v1/orders')
            .withJson({
                "product": "iPhone"
            })
            .expectStatus(400)
            .expectJson({
                "message": "product is out-of-stock"
            });
    });

});

