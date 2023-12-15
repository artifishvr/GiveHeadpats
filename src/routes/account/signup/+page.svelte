<script>
    import { Label, Input, P, Button } from 'flowbite-svelte';
    import blockedUsernamesJSON from '$lib/blockedUsernames.json';

    import { account, databases } from '$lib/appwrite';
    import { ID, Query } from 'appwrite';
    import { env } from '$env/static/public';

    let email = '';
    let password = '';
    let username = '';

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
        await account.createVerification('https://pat.arti.lol/account/verify');
        location.reload();
    }

    async function validate() {
        if (username.length < 3) {
            alert('Username must be at least 3 characters long.');
            return false;
        }

        if (username.length > 20) {
            alert('Username must be less than 20 characters long.');
            return false;
        }

        if (username.match(/^[a-zA-Z0-9_]+$/g) === null) {
            alert('Username must only contain letters, numbers, and underscores.');
            return false;
        }

        if (email.length < 3) {
            alert('Email must be at least 3 characters long.');
            return false;
        }

        if (email.length > 320) {
            alert('Email must be less than 320 characters long.');
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }

        if (username.toLowerCase() in blockedUsernamesJSON.usernames) {
            alert('Username is blocked.');
            return false;
        }

        const userdata = await databases.listDocuments(env.PUBLIC_HEADPATDB, env.PUBLIC_COLLECTION_USERDATA, [
            Query.equal('user', username),
            Query.limit(1),
        ]);
        // i know i shouldn't do this client-side but it's a fix for now ig
        // if you're thinking about bypassing this, don't. you will only create a broken account for yourself.
        if (userdata.total !== 0) {
            alert('Username is taken.');
            return false;
        }

        return true;
    }
</script>

<div class="flex justify-center items-center">
    <div class="bg-white rounded-lg p-6 max-w-lg sm:min-w-[50%] min-w-[90%]">
        <div class="mb-6">
            <Label for="username" class="block mb-2">Username</Label>
            <Input id="username" placeholder="areallycuteperson" bind:value={username} />
        </div>

        <div class="mb-6">
            <Label for="email" class="block mb-2">Email</Label>
            <Input id="email" type="email" placeholder="uwu@example.com" bind:value={email} />
        </div>

        <div class="mb-6">
            <Label for="password" class="block mb-2">Password</Label>
            <Input id="password" type="password" placeholder="gimmeheadpats" bind:value={password} />
        </div>

        <Button
            color="dark"
            on:click={async () => {
                if (!(await validate())) return;

                await account.create(ID.unique(), email, password, username.toLowerCase());

                await login(email, password);

                await fetch('/api/setupaccount', {
                    method: 'POST',
                    body: JSON.stringify({
                        user: username.toLowerCase(),
                        userID: loggedInUser.$id,
                    }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            }}>Register</Button>

        <P class="mt-6 mb-6 text-md lg:text-lg text-green-700">
            {loggedInUser ? `Signed up as ${loggedInUser.name}! Check your email to verify your account.` : ''}
        </P>

        <P class="mt-6 mb-6 text-md lg:text-ms">
            By signing up, you agree to our <a href="/account/tos" class="text-blue-600 hover:text-blue-800">Terms of Service</a> and
            <a href="/account/privacy" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
        </P>
    </div>
</div>
