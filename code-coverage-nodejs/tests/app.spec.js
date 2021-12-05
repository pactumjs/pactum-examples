const pactum = require('pactum');

describe('App', () => {

  it('GET /hello', async () => {
    await pactum.spec()
      .get('http://localhost:3000/hello')
      .expectStatus(200);
  });

});