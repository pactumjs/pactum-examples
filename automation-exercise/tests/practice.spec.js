const { test } = require('uvu');
const { spec, request } = require('pactum');

test.before(() => {
  request.setBaseUrl('https://automationexercise.com/api');
  request.setDefaultTimeout(5000);
});

test('API 1: Get All Products List', async () => {
  await spec()
    .get('/productsList')
    .expectStatus(200)
    .expectJsonLength('products', 34)
    .expectJson('products[0]', {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    });
});

test('API 2: POST To All Products List', async () => {
  await spec()
    .post('/productsList')
    .expectStatus(200)
    .expectJson({
      "responseCode": 405,
      "message": "This request method is not supported."
    });
});

test('API 3: Get All Brands List', async () => {
  await spec()
    .get('/brandsList')
    .expectStatus(200)
    .expectJsonLike('brands', '$V.length === 34')
    .expectJsonSchema({
      "type": "object",
      "properties": {
        "responseCode": {
          "type": "number"
        },
        "brands": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "brand": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": ["responseCode", "brands"]
    });
});

test('API 4: PUT To All Brands List', async () => {
  await spec()
    .put('/brandsList')
    .expectStatus(200)
    .expectJson({
      "responseCode": 405,
      "message": "This request method is not supported."
    });
});

test('API 5: POST To Search Product', async () => {
  await spec()
    .post('/searchProduct')
    .withForm({
      'search_product': 'jean'
    })
    .expectStatus(200)
    .expectJsonLike({
      "products": [
        {
          "id": 33,
          "name": "Soft Stretch Jeans"
        },
        {
          "id": 35,
          "name": "Regular Fit Straight Jeans"
        },
        {
          "id": 37,
          "name": "Grunt Blue Slim Fit Jeans"
        }
      ]
    });
});

test('API 6: POST To Search Product without search_product parameter', async () => {
  await spec()
    .post('/searchProduct')
    .expectStatus(200)
    .expectJson({
      "responseCode": 400,
      "message": "Bad request, search_product parameter is missing in POST request."
    });
});

let user_email = (Math.random() + 1).toString(36).substring(7);

test('API 11: POST To Create/Register User Account', async () => {
  await spec()
    .post('/createAccount')
    .withForm({
      name: 'user name',
      email: user_email,
      password: 'user password',
      title: 'Mr',
      birth_date: 1,
      birth_month: 1,
      birth_year: 1990,
      firstname: 'first name',
      lastname: 'last name',
      company: 'olx',
      address1: 'puma',
      address2: 'format',
      country: 'IND',
      zipcode: 10101,
      state: 'CBI',
      city: 'Kad',
      mobile_number: 9999999999
    })
    .expectJson({
      "responseCode": 201,
      "message": "User created!"
    });
});

test('API 7: POST To Verify Login with valid details', async () => {
  await spec()
    .post('/verifyLogin')
    .withForm({
      email: user_email,
      password: 'user password',
    })
    .expectJson({
      "responseCode": 200,
      "message": "User exists!"
    });
});

test('API 8: POST To Verify Login without email parameter', async () => {
  await spec()
    .post('/verifyLogin')
    .withForm({
      password: ''
    })
    .expectJson({
      "responseCode": 400,
      "message": "Bad request, email or password parameter is missing in POST request."
    });
});

test('API 9: DELETE To Verify Login', async () => {
  await spec()
    .delete('/verifyLogin')
    .expectJson({
      "responseCode": 405,
      "message": "This request method is not supported."
    });
});

test('API 10: POST To Verify Login with invalid details', async () => {
  await spec()
    .post('/verifyLogin')
    .withForm({
      email: (Math.random() + 1).toString(36).substring(10),
      password: 'invalid'
    })
    .expectJson({
      "responseCode": 404,
      "message": "User not found!"
    });
});

test('API 13: PUT METHOD To Update User Account', async () => {
  await spec()
    .put('/updateAccount')
    .withForm({
      email: user_email,
      password: 'user password',
      mobile_number: 1111111111
    })
    .expectJson({
      "responseCode": 200,
      "message": "User updated!"
    });
});

test('API 14: GET user account detail by email', async () => {
  await spec()
    .get('/getUserDetailByEmail')
    .withQueryParams('email', user_email)
    .expectJsonLike({
      "responseCode": 200,
      "user": {
        "email": user_email,
        "name": "user name"
      }
    });
});

test('API 12: DELETE METHOD To Delete User Account', async () => {
  await spec()
    .delete('/deleteAccount')
    .withForm({
      email: user_email,
      password: 'user password'
    })
    .expectJson({
      "responseCode": 200,
      "message": "Account deleted!"
    });
});

test.run();