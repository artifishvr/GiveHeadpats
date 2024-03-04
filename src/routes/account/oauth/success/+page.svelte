<script>
    import { account } from '$lib/appwrite';
    import { onMount } from 'svelte';

    onMount(async () => {
        const session = await account.getSession('current');

        // Provider information
        console.log(session);
        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);
    });
</script>
