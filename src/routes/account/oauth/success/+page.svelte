<script>
    import { account } from '$lib/appwrite';

    (async () => {
        const session = await account.getSession('current');

        // Provider information
        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);
    })();
</script>
