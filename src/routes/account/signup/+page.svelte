<script>
    import { Label, Input, P, Button } from 'flowbite-svelte';

    import { account, databases } from '$lib/appwrite';
    import { env } from '$env/dynamic/public';
    import { ID } from 'appwrite';

    let email = '';
    let password = '';
    let name = '';

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
            <Input id="username" placeholder="areallycuteperson" bind:value={name} />
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
                await account.create(ID.unique(), email, password, name);

                await login(email, password);

                await fetch('/api/headpat', {
                    method: 'POST',
                    body: JSON.stringify({
                        user: name,
                        actor: 'system',
                        message: 'Welcome!',
                        patcount: 1,
                    }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            }}>Register</Button>

        <P class="mt-6 mb-6 text-md lg:text-lg text-green-700">
            {loggedInUser ? `Signed up as ${loggedInUser.name}! Check your email to verify your account.` : ''}
        </P>
    </div>
</div>
