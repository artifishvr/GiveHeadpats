<script>
    import { Heading, P, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    export let data;
</script>

<svelte:head>
    <title>Explore</title>
    <meta name="description" content="Find new users to give headpats to!" />
</svelte:head>

<div class="mx-auto max max-w-7xl mt-10 px-4 sm:px-6 mb-8">
    <Heading tag="h1" class="mb-4" customSize="text-2xl font-bold  md:text-3xl lg:text-4xl">Explore</Heading>
    <P class="text-gray-500 dark:text-gray-400">Find new users to give headpats to!</P>
    <P class="text-gray-500 dark:text-gray-400 text-sm">(ordered alphabetically)</P>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max max-w-7xl mt-10 px-4 sm:px-6 mb-8 text-center">
    {#each data.users as user}
        <div class="bg-white dark:bg-slate-900 p-4 rounded-lg drop-shadow-sm">
            <Heading tag="h2" class="mb-4" customSize="text-md font-bold md:text-md lg:text-md">{user.user}</Heading>
            <P class="mb-6 text-sm lg:text-sm dark:text-gray-400 text-center"
                >Has received {user.PatsReceived} pat{user.PatsReceived !== 1 ? 's' : ''}!</P>
            <Button href={'/@' + user.user}>
                View
                <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
            </Button>
        </div>
    {/each}
</div>
