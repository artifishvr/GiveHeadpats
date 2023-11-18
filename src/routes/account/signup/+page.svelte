<script>
    import { account, databases } from "$lib/appwrite";
    import { env } from '$env/dynamic/public';
    import { ID } from "appwrite";

    let email = "";
    let password = "";
    let name = "";

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
        await account.createVerification("http://localhost:5173/account/verify");

    }
</script>

<form>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <input type="text" placeholder="Name" bind:value={name} />

    <button
        type="button"
        on:click={async () => {
            await account.create(ID.unique(), email, password, name);

            await login(email, password);

            await databases.createDocument(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_HEADPATS, ID.unique(), {
                'user': name
            });
        }}>Register</button
    >

    <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
    </p>
</form>
