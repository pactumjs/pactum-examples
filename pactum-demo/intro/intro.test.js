const { spec } = require('pactum');

it('should be a teapot', async () => {
  await spec()
    .get('http://httpbin.org/status/418')
    .expectStatus(418);
});