const { spec } = require('pactum');

describe('Fetch Users', function () {

  let _spec = spec();

  beforeEach(function () {
    _spec = spec();
    _spec.records('mocha', this);
  });

  it('get user 1', async function () {
    await _spec
      .get('/api/users/1')
      .expectStatus(200);
  });

  it('get user 2', async function () {
    await _spec
      .get('/api/users/2')
      .expectStatus(200);
  });

});


describe('Create Users', function () {

  let _spec = spec();

  beforeEach(function () {
    _spec = spec();
    _spec.records('mocha', this);
  });

  it('post a user', async function () {
    await _spec
      .post('/api/users/1')
      .withJson({
        "name": "morpheus",
        "job": "leader"
      })
      .expectStatus(201);
  });

});