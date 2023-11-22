<script>
    import { Label, Input, P, Button } from 'flowbite-svelte';

    import { account } from '$lib/appwrite';
    import { ID } from 'appwrite';

    let email = '';
    let password = '';
    let username = '';

    let loggedInUser = null;

    async function login(email, password) {
        await account.createEmailSession(email, password);
        loggedInUser = await account.get();
        await account.createVerification('http://localhost:5173/account/verify');
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
