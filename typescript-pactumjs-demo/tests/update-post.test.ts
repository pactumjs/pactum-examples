require('dotenv').config();
import { spec, request } from 'pactum';
import Chance from 'chance';
const chance = new Chance();

const baseUrl = "https://jsonplaceholder.typicode.com";

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

describe('Update Posts Feature', () => {
	before(async () => {
		request.setDefaultTimeout(10000);
	});

	it('should be able to update specific post', async () => {
		const randomString: string = chance.word({ length: 5 });

		const requestBody: Post = {
			userId: 1,
			id: 1,
			title: 'lorem',
			body: randomString,
		};
		const resp = await spec()
			.put(`${baseUrl}/posts/1`)
			.withBody(requestBody)
			.expectStatus(200);
	});
});
