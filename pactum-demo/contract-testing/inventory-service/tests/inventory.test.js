const pactum = require('pactum');
const { request, reporter } = pactum;
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'inventory-service';
  pf.config.projectName = 'Inventory Service';
  pf.config.version = '2.1.22';
  pf.config.token = 'YWRtaW46YWRtaW4=';
  reporter.add(pf.reporter);
}

before(() => {
    request.setBaseUrl('http://localhost:4000');
    addFlowReporter();
});

after(async () => {
    await reporter.end();
});

describe('Inventory Service', () => {

    it('get all products', async () => {
        await pactum.flow('get all products')
            .get('/api/inventory-service/v1/products')
            .expectStatus(200)
            .expectJson([
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
            ]);
    });

    it('get a product in-stock', async () => {
        await pactum.flow('get a product in-stock')
            .get('/api/inventory-service/v1/products')
            .withQueryParams('name', 'iPhone')
            .expectJson({
                "id": 1,
                "name": "iPhone",
                "InStock": true,
                "items": 147
            })
            .expectStatus(200);
    });

    it('get a product out-of-stock', async () => {
        await pactum.flow('get a product out-of-stock')
            .get('/api/inventory-service/v1/products')
            .withQueryParams('name', 'galaxy')
            .expectJson({
                "id": 2,
                "name": "galaxy",
                "InStock": false,
                "items": 0
            })
            .expectStatus(200);
    });

    it('get a invalid product', async () => {
        await pactum.flow('get a invalid product')
            .get('/api/inventory-service/v1/products')
            .withQueryParams('name', 'sony')
            .expectStatus(400);
    });

});

