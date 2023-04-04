require('dotenv').config();
import { spec, request } from 'pactum';
import { faker } from '@faker-js/faker';

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
		const randomString: string = faker.lorem.text();

		const requestBody: Post = {
			userId: 1,
			id: 1,
			title: 'lorem',
			body: randomString,
		};
		const resp = await spec()
			.put(`${process.env.BASE_URL}/posts/1`)
			.withBody(requestBody)
			.expectStatus(200);
	});
});
