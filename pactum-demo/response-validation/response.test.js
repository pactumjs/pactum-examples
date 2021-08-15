const pactum = require('pactum');

describe('ReqRes', () => {

    before(() => {
        pactum.request.setBaseUrl('https://reqres.in');
    });

    it('should have user Tobias', async () => {
        await pactum.spec()
            .get('/api/users')
            .withQueryParams('page', '2')
            .expectStatus(200)
            .expectJsonLike({
                "page": 2,
                "data": [
                    {
                        "id": "$V > 0",
                        "first_name": "Tobias",
                        "last_name": "Funke"
                    }
                ]
            });
    });

});