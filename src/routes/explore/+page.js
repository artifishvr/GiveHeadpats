import { databases } from "$lib/appwrite";
import { Query } from "appwrite";
import { PUBLIC_HEADPATDB, PUBLIC_COLLECTION_USERDATA } from '$env/static/public';

export async function load() {
    const users = await databases.listDocuments(PUBLIC_HEADPATDB, PUBLIC_COLLECTION_USERDATA, [
        Query.limit(50), //TODO - Add pagination
        Query.orderAsc("user"),
    ]);

    return {
        users: users.documents,
    };
};