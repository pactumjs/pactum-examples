const polka = require('polka');


polka()
  .get('/hello', (req, res) => {
    res.end('Hello World');
  })
  .listen(3000, () => {
    console.log('Running on port 3000');
  });