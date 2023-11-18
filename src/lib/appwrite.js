import { Client, Databases, Account } from 'appwrite';
import { env } from '$env/dynamic/public';

const client = new Client();

const databases = new Databases(client);

const account = new Account(client);

client
	.setEndpoint(env.PUBLIC_API_ENDPOINT) // Your API Endpoint
	.setProject(env.PUBLIC_PROJECT_ID) // Your project ID
	;

export { databases, account };