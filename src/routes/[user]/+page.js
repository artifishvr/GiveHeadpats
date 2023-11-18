import { Query } from 'appwrite';
import { databases } from '$lib/appwrite';
import { env } from '$env/dynamic/public';

export async function load({ params }) {
	const promise = await databases.listDocuments(
		env.PUBLIC_HEADPATDB,
		env.PUBLIC_COLLECTION_HEADPATS,
		[
			Query.equal('user', params.user)
		]
	);

	if (promise.documents.length === 0) {
		return {
			status: 404,
			user: 'Not found',
			headpats: 'Not found'
		};
	}

	return {
		headpats: promise.documents[0].headpatcount,
		user: params.user
	}
};