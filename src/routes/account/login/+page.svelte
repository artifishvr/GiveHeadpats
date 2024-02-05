<script>
    import { Label, Input, Button, P, Modal } from 'flowbite-svelte';
    import { CheckCircleOutline } from 'flowbite-svelte-icons';
    import { ID } from 'appwrite';
    import { account } from '$lib/appwrite';
    let popupModal = false;

    let email = '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    async function login(email) {
        if (!emailRegex.test(email)) return alert('Please enter a valid email address.');
        await account.createMagicURLSession(ID.unique(), email, 'https://pat.arti.lol/account/verify');
        popupModal = true;
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

        <Button color="dark" on:click={() => login(email)}>Login</Button>
        <Button color="secondary" href="https://avris.it/blog/passwords-are-passé" target="_blank">Why no password?</Button>

        <P class="mt-6 mb-6 text-md lg:text-ms">If you don't have an account yet, one will be created for you.</P>

        <P class="mt-6 mb-6 text-md lg:text-ms">
            By using this site, you agree to our <a href="/account/tos" class="text-blue-600 hover:text-blue-800">Terms of Service</a> and
            <a href="/account/privacy" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
        </P>
    </div>
</div>

<Modal bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
        <CheckCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Success! We just sent you a magic link at {email}<br />Watch for an email from "Give Headpats" (noreply@pat.arti.lol)
        </h3>
    </div>
</Modal>
