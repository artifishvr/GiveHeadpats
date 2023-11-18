import { Client, Databases, Query } from 'node-appwrite';
import { env } from '$env/dynamic/public';
import { env as privenv } from '$env/dynamic/private';

import { json, text } from '@sveltejs/kit';

const client = new Client();

const databases = new Databases(client);

client
	.setEndpoint(env.PUBLIC_API_ENDPOINT) // Your API Endpoint
	.setProject(env.PUBLIC_PROJECT_ID) // Your project ID
	.setKey(privenv.PRIVATE_API_KEY) // Your secret API key
	;

export async function POST({ request }) {
	const data = await request.json();
	console.log(data);

	const database = await databases.listDocuments(
		env.PUBLIC_HEADPATDB,
		env.PUBLIC_COLLECTION_HEADPATS,
		[
			Query.equal('user', data.user)
		]
	);

	if (database.documents.length == 0) return text('No user found.');

	databases.updateDocument(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_HEADPATS, database.documents[0].$id, {
		'headpatcount': database.documents[0].headpatcount + 1
	});

	return json(database.documents[0].headpatcount + 1);
}

export async function fallback({ request }) {
	return text(`Unknown ${request.method} request!`);
}