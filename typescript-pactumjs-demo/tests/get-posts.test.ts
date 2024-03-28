require('dotenv').config();
import { spec, request } from 'pactum';

const baseUrl = "https://jsonplaceholder.typicode.com";

describe('GET All Posts Feature', () => {
	before(async () => {
		request.setDefaultTimeout(10000);
	});

	it('should get all posts', async () => {
		const resp = await spec()
			.get(`${baseUrl}/posts`)
			.expectStatus(200);
	});
});
