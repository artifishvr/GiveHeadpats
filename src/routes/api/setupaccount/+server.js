import { Client, Databases, Users, ID } from 'node-appwrite';
import { env } from '$env/dynamic/public';
import { env as privenv } from '$env/dynamic/private';

import { text } from '@sveltejs/kit';

const client = new Client();

client
    .setEndpoint(env.PUBLIC_API_ENDPOINT)
    .setProject(env.PUBLIC_PROJECT_ID)
    .setKey(privenv.PRIVATE_API_KEY)
    ;

const databases = new Databases(client);
const users = new Users(client);

export async function POST({ request }) {
    const data = await request.json();

    await databases.createDocument(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, ID.unique(), {
        user: data.user,
        userID: data.userID,
        PatsReceived: 0,
    });

    await users.updateName(data.userID, data.user);

    return text("OK");
}

export async function fallback({ request }) {
    return text(`Unknown ${request.method} request!`);
}