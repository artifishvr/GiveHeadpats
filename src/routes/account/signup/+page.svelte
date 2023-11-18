<script>
    import { Label, Input, P, Button } from "flowbite-svelte";

    import { account, databases } from "$lib/appwrite";
    import { env } from "$env/dynamic/public";
    import { ID } from "appwrite";

    let email = "";
    let password = "";
    let name = "";

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
        await account.createVerification(
            "http://localhost:5173/account/verify"
        );
    }
</script>

<div class="mb-6 max-w-sm">
    <Label for="username" class="block mb-2">Username</Label>
    <Input id="username" placeholder="areallycuteperson" bind:value={name} />
</div>

<div class="mb-6 max-w-sm">
    <Label for="email" class="block mb-2">Email</Label>
    <Input id="email" placeholder="uwu@example.com" bind:value={email} />
</div>

<div class="mb-6 max-w-sm">
    <Label for="password" class="block mb-2">Password</Label>
    <Input id="password" placeholder="gimmeheadpats" bind:value={password} />
</div>

<Button
    color="dark"
    on:click={async () => {
        await account.create(ID.unique(), email, password, name);

        await login(email, password);

        await databases.createDocument(
            env.PUBLIC_HEADPATDB,
            env.PUBLIC_COLLECTION_HEADPATS,
            ID.unique(),
            {
                user: name,
            }
        );
    }}>Register</Button
>

<P class="mt-6 mb-6 text-lg lg:text-xl text-green-700">
    {loggedInUser ? `Signed up as ${loggedInUser.name}! Welcome!` : ""}
</P>
