require('dotenv').config();
import { spec, request } from 'pactum';

describe('GET All Posts Feature', () => {
	before(async () => {
		request.setDefaultTimeout(10000);
	});

	it('should get all posts', async () => {
		const resp = await spec()
			.get(`${process.env.BASE_URL}/posts`)
			.expectStatus(200);
	});
});
