<script>
    import { env } from '$env/dynamic/public';
    import { Heading, P, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    export let data;
</script>

<svelte:head>
    <title>Give Headpats</title>
    <meta content="Give Headpats" property="og:title" />
    <meta content="ko-fi... but headpats" property="og:description" />
    <meta content={env.PUBLIC_HOST} property="og:url" />
    <meta content="{env.PUBLIC_HOST}/patlogo-inverted.png" property="og:image" />
    <meta content="#00d64b" data-react-helmet="true" name="theme-color" />
</svelte:head>

<div class="text-center">
    <Heading tag="h1" class="mb-4 text-center" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">Give Headpats</Heading>
    <br />
    <Heading tag="h3" class="mb-4 text-center" customSize="text-2xl font-bold md:text-2xl lg:text-2xl">Most Patted</Heading>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max max-w-7xl mt-10 px-4 sm:px-6 mb-8">
        {#each data.mostpatted as patted}
            <div class="bg-white dark:bg-slate-900 p-4 rounded-lg drop-shadow-sm">
                <Heading tag="h2" class="mb-4" customSize="text-md font-bold md:text-md lg:text-md">{patted.user}</Heading>
                <P class="mb-6 text-sm lg:text-sm dark:text-gray-400 text-center"
                    >Has received {patted.PatsReceived} pat{patted.PatsReceived !== 1 ? 's' : ''}!</P>
                {#if !patted.hideButton}
                    <Button href={'/@' + patted.user}>
                        Give them a Pat!
                        <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
                    </Button>
                {:else}
                    <Button href="/account/login">Sign up! <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></Button>
                {/if}
            </div>
        {/each}
    </div>
    <Heading tag="h3" class="mb-4 text-center" customSize="text-2xl font-bold md:text-2xl lg:text-2xl">New Users</Heading>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max max-w-7xl mt-10 px-4 sm:px-6 mb-24">
        {#each data.newusers as patted}
            <div class="bg-white dark:bg-slate-900 p-4 rounded-lg drop-shadow-sm">
                <Heading tag="h2" class="mb-4" customSize="text-md font-bold md:text-md lg:text-md">{patted.user}</Heading>
                <P class="mb-6 text-sm lg:text-sm dark:text-gray-400 text-center"
                    >Has received {patted.PatsReceived} pat{patted.PatsReceived !== 1 ? 's' : ''}!</P>
                {#if !patted.hideButton}
                    <Button href={'/@' + patted.user}>
                        Give them a Pat!
                        <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
                    </Button>
                {:else}
                    <Button href="/account/login">Sign up! <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /></Button>
                {/if}
            </div>
        {/each}
    </div>
</div>
