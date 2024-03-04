import { Client, Databases } from 'node-appwrite';
import { env } from '$env/dynamic/public';
import { env as privenv } from '$env/dynamic/private';

import { text } from '@sveltejs/kit';
import { Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint(env.PUBLIC_API_ENDPOINT)
    .setProject(env.PUBLIC_PROJECT_ID)
    .setKey(privenv.PRIVATE_API_KEY)
    ;

const databases = new Databases(client);

export async function POST({ request }) {
    const data = await request.json();

    const userdocument = await databases.listDocuments(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, [
        Query.equal('userID', data.userid),
    ]);

    await databases.updateDocument(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, userdocument.documents[0].$id, {
        pfpID: data.pfpid,
    });


    return text("OK");
}

export async function fallback({ request }) {
    return text(`Unknown ${request.method} request!`);
}