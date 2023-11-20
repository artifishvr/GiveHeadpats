import { Query } from 'appwrite';
import { databases } from '$lib/appwrite';
import { env } from '$env/dynamic/public';

export async function load({ params }) {
	const database = await databases.listDocuments(
		env.PUBLIC_HEADPATDB,
		env.PUBLIC_COLLECTION_HEADPATLIST,
		[
			Query.equal('headpatted', params.user),
			Query.orderDesc("$createdAt")
		]
	);

	let totalpats = 0;
	database.documents.forEach(document => {
		totalpats += document.count;
	});

	if (database.documents.length == 0) {
		return {
			headpats: 0,
			user: "User not found",
			allpats: [],
			status: 404,
		}
	}

	return {
		headpats: totalpats,
		user: params.user,
		allpats: database.documents,
		status: 200,
	}
};