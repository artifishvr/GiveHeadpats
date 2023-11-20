import { Client, Databases, Query, ID } from 'node-appwrite';
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

	const database = await databases.listDocuments(
		env.PUBLIC_HEADPATDB,
		env.PUBLIC_COLLECTION_HEADPATLIST,
		[
			Query.equal('headpatted', data.user)
		]
	);

	let totalpats = 0;
	database.documents.forEach(document => {
		totalpats += document.count;
	});

	databases.createDocument(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_HEADPATLIST, ID.unique(), {
		headpatted: data.user,
		actor: data.actor,
		message: data.message,
		count: data.patcount,
	});


	return json(totalpats + data.patcount);
}

export async function fallback({ request }) {
	return text(`Unknown ${request.method} request!`);
}