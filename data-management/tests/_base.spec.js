const { request, stash } = require('pactum');

before(() => {
  setRequestDefaults();
  setData();
});

function setRequestDefaults() {
  request.setBaseUrl('$M{Environments.Production}');
  request.setDefaultTimeout(5000);
}

function setData() {
  stash.loadData('./data');
}