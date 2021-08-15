const pactum = require('pactum');
const { mock, request, reporter } = pactum;
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'order-service';
  pf.config.projectName = 'Order Service';
  pf.config.version = '1.0.15';
  pf.config.token = 'YWRtaW46YWRtaW4=';
  reporter.add(pf.reporter);
}

before(async () => {
    await mock.start(4000);
    request.setBaseUrl('http://localhost:3000');
    addFlowReporter();
});

after(async () => {
    await mock.stop();
    await reporter.end();
});

describe('Order Service', () => {

    it('should buy a product which is in-stock', async () => {
        await pactum.flow('buy a product which is in-stock')
            .useInteraction({
                provider: 'inventory-service',
                flow: 'get a product in-stock',
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
            .post('/api/order-service/v1/orders')
            .withJson({
                "product": "iPhone"
            })
            .expectStatus(200);
    });

    it('should buy a product which is out-of-stock', async () => {
        await pactum.flow('buy a product which is out-of-stock')
            .useInteraction({
                provider: 'inventory-service',
                flow: 'get a product out-of-stock',
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
            .post('/api/order-service/v1/orders')
            .withJson({
                "product": "iPhone"
            })
            .expectStatus(400)
            .expectJson({
                "message": "product is out-of-stock"
            });
    });

});

