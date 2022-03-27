const { spec } = require('pactum');

describe('Register Users', function () {

  let _spec = spec();

  beforeEach(function () {
    _spec = spec();
    _spec.records('mocha', this);
  });

  it('register a user', async function () {
    await _spec
      .post('https://reqres.in/api/register')
      .withJson({
        "email": "eve.holt@reqres.in",
        "password": "pistol"
      })
      .expectStatus(200);
  });

});