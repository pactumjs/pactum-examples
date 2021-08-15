const pactum = require('pactum');

describe('ReqRes', () => {

    before(() => {
        pactum.request.setBaseUrl('https://reqres.in');
    });

    it('list page 2 users', async () => {
        await pactum.spec()
            .get('/api/users')
            .withQueryParams('page', '2')
            .expectStatus(200);
    });


    it('create new user', async () => {
        await pactum.spec()
            .post('/api/users')
            .withJson({
                "name": "morpheus",
                "job": "leader"
            })
            .expectStatus(201);
    });

});