require('dotenv').config();
import { spec, request } from 'pactum';

describe('GET All Albums Feature', () => {
	before(async () => {
		request.setDefaultTimeout(10000);
	});

	it('should get all albums', async () => {
		const resp = await spec()
			.get(`${process.env.BASE_URL}/albums`)
			.expectStatus(200);
	});
});
