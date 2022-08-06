const { spec } = require('pactum');
const { like } = require('pactum-matchers');

describe('Register User', () => {

  it('should register a user', async () => {
    await spec()
      .post('/api/register')
      .withJson({
        '@DATA:TEMPLATE@': 'Credentials:Eve'
      })
      .expectStatus(200)
      .expectJsonMatch({
        "id": like(4),
        "token": like("some-token")
      })
  });

});
