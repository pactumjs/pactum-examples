const { spec, request } = require('pactum');

describe('ReqRes', () => {

  before(() => {
    request.setBaseUrl('https://reqres.in');
  });

  it('list page 2 users', async () => {
    await spec()
      .get('/api/users')
      .withQueryParams('page', '2')
      .expectStatus(200);
  });


  it('create new user', async () => {
    await spec()
      .post('/api/users')
      .withJson({
        "name": "morpheus",
        "job": "leader"
      })
      .expectStatus(201);
  });

});