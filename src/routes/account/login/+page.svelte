<script>
    import { Label, Input, P, Button } from 'flowbite-svelte';

    import { account } from '$lib/appwrite';

    let email = '';
    let password = '';

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
        location.reload();
    }
</script>

<svelte:head>
    <title>login to give headpats</title>
</svelte:head>

<div class="flex justify-center items-center">
    <div class="bg-white rounded-lg p-6 max-w-lg sm:min-w-[50%] min-w-[90%]">
        <div class="mb-6">
            <Label for="email" class="block mb-2">Email</Label>

            <Input id="email" placeholder="uwu@example.com" bind:value={email} />
        </div>

        <div class="mb-6">
            <Label for="password" class="block mb-2">Password</Label>
            <Input id="password" type="password" placeholder="gimmeheadpats" bind:value={password} />
        </div>

        <Button color="dark" on:click={() => login(email, password)}>Login</Button>
        <Button color="secondary" href="/account/forgot">Forgot Password?</Button>

        <P class="mt-6 mb-6 text-md lg:text-lg">
            {loggedInUser ? `Welcome back, ${loggedInUser.name}!` : ''}
        </P>
    </div>
</div>
