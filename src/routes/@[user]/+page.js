import { Query } from 'appwrite';
import { databases } from '$lib/appwrite';
import { PUBLIC_HEADPATDB, PUBLIC_COLLECTION_HEADPATLIST, PUBLIC_COLLECTION_USERDATA } from '$env/static/public';

export async function load({ params }) {

	const listdatabase = await databases.listDocuments(
		PUBLIC_HEADPATDB,
		PUBLIC_COLLECTION_HEADPATLIST,
		[
			Query.equal('headpatted', params.user),
			Query.orderDesc("$createdAt"),
			Query.limit(5),
		]
	);

	const userdata = await databases.listDocuments(
		PUBLIC_HEADPATDB,
		PUBLIC_COLLECTION_USERDATA,
		[
			Query.equal('user', params.user),
			Query.limit(1),
		]
	);

	if (userdata.total == 0) {
		return {
			headpats: 0,
			user: "User not found",
			allpats: [],
			status: 404,
		}
	}


	return {
		headpats: userdata.documents[0].PatsReceived,
		user: params.user,
		allpats: listdatabase.documents,
		status: 200,
		pfp: userdata.documents[0].pfpID,
	}
};