import { databases } from "$lib/appwrite";
import { Query } from "appwrite";
import { PUBLIC_HEADPATDB, PUBLIC_COLLECTION_USERDATA } from '$env/static/public';

export async function load() {
    let mostpatted = await databases.listDocuments(PUBLIC_HEADPATDB, PUBLIC_COLLECTION_USERDATA, [
        Query.orderDesc('PatsReceived'),
        Query.limit(4),
    ]);

    if (mostpatted.documents.length < 4) {
        for (let i = mostpatted.documents.length; i < 4; i++) {
            mostpatted.documents.push({
                PatsReceived: 0,
                user: 'No one yet!',
                hideButton: true,
            });
        }
    }

    let newusers = await databases.listDocuments(PUBLIC_HEADPATDB, PUBLIC_COLLECTION_USERDATA, [
        Query.orderDesc('$createdAt'),
        Query.limit(4),
    ]);

    if (newusers.documents.length < 4) {
        for (let i = newusers.documents.length; i < 4; i++) {
            newusers.documents.push({
                PatsReceived: 0,
                user: 'No one yet!',
                hideButton: true,
            });
        }
    }

    return {
        mostpatted: mostpatted.documents,
        newusers: newusers.documents
    };
};