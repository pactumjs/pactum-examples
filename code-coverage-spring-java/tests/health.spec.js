const { spec } = require('pactum');

describe('Health', () => {

  it('should get health as OK', async () => {
    await spec()
      .get('http://localhost:8080/api/v1/health')
      .expectStatus(200)
      .expectJson({
        "message": "OK"
      });
  });

});