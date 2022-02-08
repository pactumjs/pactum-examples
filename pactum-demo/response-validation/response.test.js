const { spec, request } = require('pactum');

describe('ReqRes', () => {

  before(() => {
    request.setBaseUrl('https://reqres.in');
  });

  it('should have user Tobias', async () => {
    await spec()
      .get('/api/users')
      .withQueryParams('page', '2')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJson('data[0].id', 7)
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