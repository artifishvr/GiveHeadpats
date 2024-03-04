// you are valid!

import { Client, Databases, Query } from 'node-appwrite';
import { env } from '$env/dynamic/public';
import { env as privenv } from '$env/dynamic/private';

import { text } from '@sveltejs/kit';

import blockedUsernamesJSON from '$lib/blockedUsernames.json';

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint(env.PUBLIC_API_ENDPOINT)
    .setProject(env.PUBLIC_PROJECT_ID)
    .setKey(privenv.PRIVATE_API_KEY)
    ;


let message = '';
let status = 200;

export async function POST({ request }) {
    const data = await request.json();

    await validate(data.username);

    return new Response(JSON.stringify({
        status: status,
        message: message,
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function fallback({ request }) {
    return text(`Unknown ${request.method} request!`);
}

async function validate(username) {
    if (username.length < 3) {
        message = 'Username must be at least 3 characters long.';
        status = 401;
        return false;
    }

    if (username.length > 20) {
        message = 'Username must be less than 20 characters long.';
        status = 401;
        return false;
    }

    if (!username.match(/^\w+$/)) {
        message = 'Username must only contain letters, numbers, and underscores.';
        status = 401;
        return false;
    }

    if (username.toLowerCase() in blockedUsernamesJSON.usernames) {
        message = 'Username is blocked.';
        status = 401;
        return false;
    }

    const userdata = await databases.listDocuments(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, [
        Query.equal('user', username),
        Query.limit(1),
    ]);

    if (userdata.total !== 0) {
        message = 'Username is taken.';
        status = 401;
        return false;
    }

    return true;
}