<script>
    import { Label, Input, P, Button } from "flowbite-svelte";

    import { account } from "$lib/appwrite";

    let email = "";
    let password = "";

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
    }
</script>

<div class="mb-6 max-w-sm">
    <Label for="email" class="block mb-2">Email</Label>
    <Input id="email" placeholder="uwu@example.com" bind:value={email} />
</div>

<div class="mb-6 max-w-sm">
    <Label for="password" class="block mb-2">Password</Label>
    <Input id="password" placeholder="gimmeheadpats" bind:value={password} />
</div>

<Button color="dark" on:click={() => login(email, password)}>Login</Button>

<P class="mt-6 mb-6 text-lg lg:text-xl ">
    {loggedInUser ? `Welcome back, ${loggedInUser.name}!` : ""}
</P>
