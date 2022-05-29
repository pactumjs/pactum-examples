const { spec, request } = require('pactum');

before(async () => {
  await setRequestDefaults();
  await addDummyTodos();
});

async function setRequestDefaults() {
  request.setBaseUrl('https://apichallenges.herokuapp.com');
  const id = await getChallengerId();
  console.log(`API Challenges | Challenger ID - ${id} \n`);
  request.setDefaultHeaders('X-CHALLENGER', id);
}

async function getChallengerId() {
  return await spec()
    .post('/challenger')
    .expectStatus(201)
    .returns('res.headers.x-challenger');
}

async function addDummyTodos() {
  await spec()
    .post('/todos')
    .withJson({
      "title": "process payroll",
      "doneStatus": false,
      "description": ""
    })
    .expectStatus(201);
  await spec()
    .post('/todos')
    .withJson({
      "title": "train staff",
      "doneStatus": false,
      "description": ""
    })
    .expectStatus(201);
}