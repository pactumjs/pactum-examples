const { spec } = require('pactum');

describe('First Real Challenge', () => {

  it('get all challenges', async () => {
    await spec()
      .get('/challenges')
      .expectStatus(200)
      .expectJsonLike({
        "challenges": [
          {
            "id": "01",
            "name": "POST /challenger (201)",
            "status": true
          }
        ]
      });
  });

});

describe('GET Challenges', () => {

  it('get all todos', async () => {
    await spec()
      .get('/todos')
      .expectStatus(200);
  });

  it('get todo should return 404', async () => {
    await spec()
      .get('/todo')
      .expectStatus(404);
  });

  it('get todo with specific id', async () => {
    const todoId = await spec()
      .get('/todos')
      .returns('todos[0].id');

    await spec()
      .get('/todos/{id}')
      .withPathParams('id', todoId)
      .expectStatus(200);
  });

  it('get todo that does not exist should return 404', async () => {
    await spec()
      .get('/todos/{id}')
      .withPathParams('id', '-1')
      .expectStatus(404);
  });

});

describe('HEAD Challenges', () => {

  it('perform head request on /todos', async () => {
    await spec()
      .head('/todos')
      .expectStatus(200);
  });

});

describe('Creation Challenges with POST', () => {

  it('create a todo', async () => {
    await spec()
      .post('/todos')
      .withJson({
        "title": "train new staff",
        "doneStatus": true,
        "description": ""
      })
      .expectStatus(201);
  });

  it('get todos that are completed', async () => {
    await spec()
      .get('/todos')
      .withQueryParams('doneStatus', 'true')
      .expectStatus(200)
      .expectJsonLike({
        "todos": [
          {
            "title": "train new staff",
            "doneStatus": true
          }
        ]
      });
  });

  it('create a todo with invalid doneStatus', async () => {
    await spec()
      .post('/todos')
      .withJson({
        "title": "train new staff",
        "doneStatus": "completed",
        "description": ""
      })
      .expectStatus(400)
      .expectJson({
        "errorMessages": [
          "Failed Validation: doneStatus should be BOOLEAN"
        ]
      });
  });

});

describe('Update Challenges with POST', () => {

  it('update a todo', async () => {
    const todoId = await spec()
      .get('/todos')
      .returns('todos[0].id');
    await spec()
      .post('/todos/{id}')
      .withPathParams('id', todoId)
      .withJson({
        "description": "new description"
      })
      .expectStatus(200);
  });

});

describe('DELETE Challenges', () => {

  it('delete a todo', async () => {
    const todoId = await spec()
      .get('/todos')
      .returns('todos[0].id');
    await spec()
      .delete('/todos/{id}')
      .withPathParams('id', todoId)
      .expectStatus(200);
  });

});

describe('OPTIONS Challenges', () => {

  it('fetch options of /todos', async () => {
    await spec()
      .options('/todos')
      .expectStatus(200)
      .expectHeader('allow', 'OPTIONS, GET, HEAD, POST');
  });

});

describe('Accept Challenges', () => {

  it('get todos in XML format', async () => {
    await spec()
      .get('/todos')
      .withHeaders('Accept', 'application/xml')
      .expectStatus(200)
      .expectBodyContains('<todos><todo>');
  });

  it('get todos in JSON format', async () => {
    await spec()
      .get('/todos')
      .withHeaders('Accept', 'application/json')
      .expectStatus(200)
      .expectJsonLike({
        "todos": [
          {
            "title": /\w+/
          }
        ]
      });
  });

  it('get todos in JSON format when Accept header is ANY', async () => {
    await spec()
      .get('/todos')
      .withHeaders('Accept', '*/*')
      .expectStatus(200)
      .expectJsonLike({
        "todos": [
          {
            "title": /\w+/
          }
        ]
      });
  });

  it('get todos in XML format when Accept header contains XML as preferred', async () => {
    await spec()
      .get('/todos')
      .withHeaders('Accept', 'application/xml, application/json')
      .expectStatus(200)
      .expectBodyContains('<todos><todo>');
  });

  it('get todos in JSON when Accept header is absent', async () => {
    await spec()
      .get('/todos')
      .expectStatus(200)
      .expectJsonLike({
        "todos": [
          {
            "title": /\w+/
          }
        ]
      });
  });

  it('get todos with unsupported Accept header should return NOT ACCEPTABLE', async () => {
    await spec()
      .get('/todos')
      .withHeaders('Accept', 'application/gzip')
      .expectStatus(406);
  });

});

describe('Content-Type Challenges', () => {

  it('create a todo with XML payload', async () => {
    await spec()
      .post('/todos')
      .withHeaders('Content-Type', 'application/xml')
      .withHeaders('Accept', 'application/xml')
      .withBody(`
        <todo>
          <doneStatus>false</doneStatus>
          <description>xml todo description</description>
          <title>xml todo title</title>
        </todo>
      `)
      .expectStatus(201)
      .expectBodyContains('<id>');
  });

  it('create a todo with JSON Payload', async () => {
    await spec()
      .post('/todos')
      .withHeaders('Content-Type', 'application/json')
      .withHeaders('Accept', 'application/json')
      .withJson({
        "title": "train new staff",
        "doneStatus": true,
        "description": ""
      })
      .expectStatus(201)
      .expectJsonLike({
        "id": /\d+/
      });
  });

  it('create a todo with unsupported Content-Type', async () => {
    await spec()
      .post('/todos')
      .withHeaders('Content-Type', 'application/gzip')
      .withJson({
        "title": "train new staff",
        "doneStatus": true,
        "description": ""
      })
      .expectStatus(415);
  });

});

describe('Mix Accept and Content-Type Challenges', () => {

  it('create a todo with XML payload and accept JSON', async () => {
    await spec()
      .post('/todos')
      .withHeaders('Content-Type', 'application/xml')
      .withHeaders('Accept', 'application/json')
      .withBody(`
        <todo>
          <doneStatus>false</doneStatus>
          <description>xml todo description</description>
          <title>xml todo title</title>
        </todo>
      `)
      .expectStatus(201)
      .expectJsonLike({
        "id": /\d+/
      });
  });

  it('create a todo with JSON payload and accept XML', async () => {
    await spec()
      .post('/todos')
      .withHeaders('Content-Type', 'application/json')
      .withHeaders('Accept', 'application/xml')
      .withJson({
        "title": "train new staff",
        "doneStatus": true,
        "description": ""
      })
      .expectStatus(201)
      .expectBodyContains('<id>');
  });

});

describe('Status Code Challenges', () => {

  it('delete /heartbeat should not be allowed', async () => {
    await spec()
      .delete('/heartbeat')
      .expectStatus(405);
  });

  it('patch /heartbeat should break system', async () => {
    await spec()
      .patch('/heartbeat')
      .expectStatus(500);
  });

  it('trace /heartbeat should break system', async () => {
    await spec()
      .trace('/heartbeat')
      .expectStatus(501);
  });

  it('get /heartbeat should return no content', async () => {
    await spec()
      .get('/heartbeat')
      .expectStatus(204);
  });

});

describe('Authentication Challenges', () => {

  it('POST /secret/token with invalid username/password', async () => {
    await spec()
      .post('/secret/token')
      .withAuth('admin', 'secret')
      .expectStatus(401);
  });

  it('POST /secret/token with valid username/password', async () => {
    await spec()
      .post('/secret/token')
      .withAuth('admin', 'password')
      .expectStatus(201);
  });

});

describe('Authorization Challenges', () => {

  let token;

  before(async () => {
    token = await spec()
      .post('/secret/token')
      .withAuth('admin', 'password')
      .expectStatus(201)
      .returns('res.headers.x-auth-token');
  });

  it('GET /secret/note with invalid auth token', async () => {
    await spec()
      .get('/secret/note')
      .withHeaders('X-AUTH-TOKEN', 'abc')
      .expectStatus(403);
  });

  it('GET /secret/note with no auth token', async () => {
    await spec()
      .get('/secret/note')
      .expectStatus(401);
  });

  it('GET /secret/note with valid auth token', async () => {
    await spec()
      .get('/secret/note')
      .withHeaders('X-AUTH-TOKEN', token)
      .expectStatus(200)
      .expectJson({
        "note": ""
      });
  });

  it('POST /secret/note with valid auth token', async () => {
    await spec()
      .post('/secret/note')
      .withHeaders('X-AUTH-TOKEN', token)
      .withJson({
        "note": "secret"
      })
      .expectStatus(200);
  });

  it('POST /secret/note with no auth token', async () => {
    await spec()
      .post('/secret/note')
      .withJson({
        "note": "secret"
      })
      .expectStatus(401);
  });

  it('POST /secret/note with invalid auth token', async () => {
    await spec()
      .post('/secret/note')
      .withHeaders('X-AUTH-TOKEN', 'abc')
      .withJson({
        "note": "secret"
      })
      .expectStatus(403);
  });

  it('GET /secret/note with valid Bearer token', async () => {
    await spec()
      .get('/secret/note')
      .withHeaders('Authorization', `Bearer ${token}`)
      .expectStatus(200)
      .expectJson({
        "note": "secret"
      });
  });

  it('POST /secret/note with valid Bearer token', async () => {
    await spec()
      .post('/secret/note')
      .withHeaders('Authorization', `Bearer ${token}`)
      .withJson({
        "note": "secret"
      })
      .expectStatus(200);
  });

});

describe('Miscellaneous Challenges', () => {

  it('delete all todos', async () => {
    const ids = await spec()
      .get('/todos')
      .returns('todos[*].id');
    for (let i = 0; i < ids.length; i++) {
      await spec()
        .delete('/todos/{id}')
        .withPathParams('id', ids[i])
        .expectStatus(200);
    }
    await spec()
      .get('/todos')
      .expectStatus(200)
      .expectJson({
        "todos": []
      });
  }).timeout(60000);

});