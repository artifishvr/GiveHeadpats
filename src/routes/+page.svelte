<script>
    import { databases } from '$lib/appwrite';
    import { Query } from 'appwrite';
    import { env } from '$env/dynamic/public';
    import { Heading, P, Button, Footer } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

    let mostpatted = [];

    const promise = databases.listDocuments(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, [
        Query.orderDesc('PatsReceived'),
        Query.limit(4),
    ]);

    promise.then(
        function (response) {
            mostpatted = response.documents;

            if (mostpatted.length < 4) {
                for (let i = mostpatted.length; i < 4; i++) {
                    mostpatted.push({
                        PatsReceived: 0,
                        user: 'No one yet!',
                        hideButton: true,
                    });
                }
            }
        },
        function (error) {
            console.log(error);
        },
    );
</script>

<div class="text-center">
    <Heading tag="h1" class="mb-4 text-center" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">Give Headpats</Heading>
    <br />
    <Heading tag="h3" class="mb-4 text-center" customSize="text-2xl font-bold md:text-2xl lg:text-2xl">Most Patted</Heading>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max max-w-7xl mt-10 px-4 sm:px-6 mb-64">
        {#each mostpatted as patted}
            <div class="bg-white p-4 rounded-lg drop-shadow-sm">
                <Heading tag="h2" class="mb-4" customSize="text-md font-bold md:text-md lg:text-md">{patted.user}</Heading>
                <P class="mb-6 text-sm lg:text-sm dark:text-gray-400 text-center"
                    >Has received {patted.PatsReceived} pat{patted.PatsReceived !== 1 ? 's' : ''}!</P>
                {#if !patted.hideButton}
                    <Button href={'/' + patted.user}>
                        Give them a Pat!
                        <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
                    </Button>
                {:else}
                    <Button href="/account/signup">Sign up! <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></Button>
                {/if}
            </div>
        {/each}
    </div>

    <Footer>
        <Heading tag="h3" class="mb-4 text-center mt-10" customSize="text-2xl font-bold md:text-2xl lg:text-2xl"
            >Built with ❤️ by ArtificialVR</Heading>
    </Footer>
</div>
