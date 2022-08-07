const { spec } = require('pactum');

describe('Create User', () => {

  it('should create a user', async () => {
    await spec()
      .post('/api/users')
      .withJson({
        '@DATA:TEMPLATE@': 'Users:Admin'
      })
      .expectStatus(201)
  });

  it('should create a user without name', async () => {
    await spec()
      .post('/api/users')
      .withJson({
        '@DATA:TEMPLATE@': 'Users:Admin',
        '@REMOVES@': ['name']
      })
      .expectStatus(201)
  });

  it('should create a user with empty job', async () => {
    await spec()
      .post('/api/users')
      .withJson({
        '@DATA:TEMPLATE@': 'Users:Admin',
        '@OVERRIDES@': {
          'job': ''
        }
      })
      .expectStatus(201)
  });


});

describe('Fetch User', () => {

  it('should get a user with id', async () => {
    await spec()
      .get('/api/users/2')
      .expectStatus(200)
      .expectJson({
        data: {
          '@DATA:TEMPLATE@': 'Users:Janet'
        },
        support: {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      });
  });

});
