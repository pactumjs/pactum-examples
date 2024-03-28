require('dotenv').config();
import { spec, request } from 'pactum';

const baseUrl = "https://jsonplaceholder.typicode.com";

describe('GET All Albums Feature', () => {
	before(async () => {
		request.setDefaultTimeout(10000);
	});

	it('should get all albums', async () => {
		const resp = await spec()
			.get(`${baseUrl}/albums`)
			.expectStatus(200);
	});
});
