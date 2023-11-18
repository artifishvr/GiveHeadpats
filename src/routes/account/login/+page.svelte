<script>
    import { account } from "$lib/appwrite";

    let email = "";
    let password = "";

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
    }
</script>

<form>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button type="button" on:click={() => login(email, password)}>Login</button>

    <button
        type="button"
        on:click={async () => {
            await account.deleteSession("current");
            loggedInUser = null;
        }}>Logout</button
    >

    <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
    </p>
</form>
